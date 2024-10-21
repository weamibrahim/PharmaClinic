const Patient = require("../Models/Patient");
const Prescription = require("../Models/Prescription");
const PatientController = {};
const User = require("../Models/User");

PatientController.getAllPatients = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const startIndex = (page - 1) * limit;
    const totalCount = await Patient.countDocuments();

    const patients = await Patient.find({ doctors: req.user.userId })
      .limit(limit)
      .skip(startIndex);
    res.json({
      patients,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
    //console.log(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

PatientController.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

PatientController.createPatient = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.user.userId;
    const { name, age, gender, phone, address } = req.body;
    const oldPatient = await Patient.findOne({ phone: req.body.phone });

    if (oldPatient) {
      if (!oldPatient.doctors.includes(userId)) {
        oldPatient.doctors.push(userId);
        await oldPatient.save();
        const updatedUser = await User.updateOne(
          { _id: userId },
          { $push: { patient: oldPatient._id } }
        );
        console.log("updated", updatedUser);
        res
          .status(200)
          .json({ oldPatient, message: "Patient added successfully" });
      } else {
        res
          .status(400)
          .json({ message: "Patient already exists with this phone" });
      }
    } else {
      const patient = new Patient({
        doctors: [userId],
        name,
        age,
        gender,
        phone,
        address,
      });
      //console.log(patient);
      await patient.save();
      const updated_User = await User.updateOne(
        { _id: userId },
        { $push: { patient: patient._id } }
      );
      console.log("updated", updated_User);
      res.status(200).json({ patient, message: "Patient added successfully" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
PatientController.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.json({ message: "Patient updated successfully", patient });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
PatientController.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      _id: req.params.id,
      doctors: req.user.userId,
    });
    console.log("patient", patient);
    if (!patient) {
      return res
        .status(404)
        .json({
          message: "Patient not found or not associated with this doctor",
        });
    }
    if (patient.doctors.length > 1) {
      await Prescription.deleteMany({ patientId: req.params.id });
      await User.updateOne(
        { _id: req.user.userId },
        { $pull: { patient: req.params.id } }
      )
      await Patient.updateOne(
        { _id: req.params.id },
        { $pull: { doctors: req.user.userId } }
      );
      return res.json({ message: "Removed patient successfully" });
    } else {
      await Prescription.deleteMany({ patientId: req.params.id });
      await User.updateOne(
        { _id: req.user.userId },
        { $pull: { patient: req.params.id } }
      );
      await Patient.findByIdAndDelete(req.params.id);
      return res.json({ message: "Patient deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = PatientController;
