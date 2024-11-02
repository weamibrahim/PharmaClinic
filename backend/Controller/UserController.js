const User = require("../Models/User");
const Prescription = require("../Models/Prescription");
const Patient = require("../Models/Patient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserController = {};
const {RegistrationSchema, LoginSchema} = require("../Middleware/vaildation");

// Register a new user
UserController.register = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password,confirmPassword, role ,phone,address,specialization } = req.body;
    const { error } = RegistrationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const user = await User.findOne({ email });
    console.log(user);
    // if (password !== confirmPassword) {
    //   return res.status(400).json({ message: "Passwords do not match" });
    // }
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let imageUrl = null;
    if (req.file) {
      imageUrl = req.file.path;
    }

    const newUser = await new User({
      name,
      email,
      phone,
      address,
      specialization,
      password: hashedPassword,
      role,
      photo: imageUrl,
    });
    await newUser.save();
    res.status(201).json({ newUser, message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




// Login a user
UserController.login = async (req, res) => {
  try {
    console.log(req.body);
    const { error } = LoginSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid  password" });
    }

    // Generate access token
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET
    );
    console.log(accessToken);

    res.status(200).json({ user, message: "Login successful", accessToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


UserController.GetUsers = async(req,res)=>{
  try{
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const startIndex = (page - 1) * limit;
    const totalCount = await User.countDocuments();
    const users = await User.find()
      .limit(limit)
      .skip(startIndex)
      .sort({ Date: -1 })
      
    res.json({
      users,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
   // console.log(users);
  }
  catch(error){
    res.status(400).json({ message: error.message });
  }
}

UserController.getAllUser = async (req, res) => {
  
  try {
   
  const users = await User.find({_id:{$ne:req.user.userId}});
    
    res.json({users});
    //console.log(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
// Update a user
UserController.updateUser = async (req, res) => {
  try {
console.log(req.body);
    let imageUrl = req.body.photo;
    if (req.file) {
      imageUrl = req.file.path;
    }
const updatedInfo = {...req.body, photo:imageUrl};
    const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedInfo, {
      new: true,
    });
    console.log(updatedUser);
    res.json({ updatedUser, message: "User updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 

UserController.updateRoleOfUser = async(req,res) => {

console.log("role", req.body)
  try{
  
const updateRoleOfUser =await User.findByIdAndUpdate(req.params.id,req.body,{
  new:true
})
res.json({ updateRoleOfUser, message: "Admin  updated  role successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

}

UserController.deleteUser = async (req, res) => {
  try {
    const doctorId = req.params.id;

    await Prescription.deleteMany({ userId:doctorId });
    await Patient.updateMany({ doctors: doctorId}, { $pull: { doctors: doctorId } });
    
   const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = UserController;
