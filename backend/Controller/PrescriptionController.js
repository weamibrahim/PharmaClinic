const Prescription = require("../Models/Prescription");
const Notification = require("../Models/Notifications");
const PrescriptionController = {};

PrescriptionController.getAllPrescriptions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const startIndex = (page - 1) * limit;
    const totalCount = await Prescription.countDocuments();
    const prescriptions = await Prescription.find()
      .limit(limit)
      .skip(startIndex)
      .sort({ Date: -1 })
      .populate("patientId");
    res.json({
      prescriptions,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
    //console.log(prescriptions);
   
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

PrescriptionController.getPrescriptionsByPatient = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const startIndex = (page - 1) * limit;
    const totalCount = await Prescription.countDocuments();
    const prescriptions = await Prescription.find({
      patientId: req.params.patientId,
      userId: req.user.userId
    })
      .limit(limit)
      .skip(startIndex)
      .sort({ Date: -1 })
      .populate("patientId");
    res.json({
      prescriptions,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

PrescriptionController.getPrescriptionById = async (req, res) => {
  console.log(req.params.id);
  try {
    const prescription = await Prescription.findById(req.params.id).populate("patientId").populate("userId");
        console.log("oldprescription",prescription);
        const UserRole = req.user.role;
     
       if(UserRole == "pharmacist"){
        prescription.IsRead = true;
        await prescription.save();
         
       }
       console.log("newprescription",prescription);
    res.json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

PrescriptionController.createPrescription = async (req, res) => {
  try {
    let patientId = req.params.patientId; 
            patientId = patientId.trim();

            const { prescription, Date,NameOfDoctor,IsRead } = req.body; 

            const newPrescription = new Prescription({
              userId: req.user.userId,
                patientId, 
                prescription,
                Date,
                NameOfDoctor,
                IsRead
            });

            await newPrescription.save();

            const notification = new Notification({
              userId: req.user.userId,
              notification: "A new Prescription has been added",
              type: "addPrescription",
              
            });
            await notification.save();
            global.io.emit('newPrescriptionNotification', {
              message: 'A new prescription has been added!',
              // prescriptionId: newPrescription._id,
              // doctorName: req.user.name,
          });
            res.status(201).json({ newPrescription, message: "Prescription added successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
PrescriptionController.updatePrescription = async (req, res) => {
  try {
    const updatedPrescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ updatedPrescription , message: "Prescription updated successfully"});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
PrescriptionController.deletePrescription = async (req, res) => {
  try {
    const deletedPrescription = await Prescription.findByIdAndDelete(
      req.params.id
    );
    res.json({ deletedPrescription, message: "Prescription deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = PrescriptionController;
