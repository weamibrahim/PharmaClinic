const express = require("express");
const router = express.Router();

const verifyToken = require("../Middleware/Authentication");
const {verifyRoleDoctor , verifyRolePharmacist} = require("../Middleware/Authorization");

// Import the PrescriptionController
const PrescriptionController = require("../Controller/PrescriptionController");

// Define the routes
router.get("/", verifyToken, PrescriptionController.getAllPrescriptions);
router.get("/:patientId", verifyToken,verifyRoleDoctor,  PrescriptionController.getPrescriptionsByPatient);
router.post("/:patientId", verifyToken, verifyRoleDoctor,  PrescriptionController.createPrescription);
router.get("/view/:id", verifyToken,  PrescriptionController.getPrescriptionById);
router.put("/:id", verifyToken, verifyRoleDoctor,  PrescriptionController.updatePrescription);
router.delete("/:id", verifyToken, verifyRoleDoctor,  PrescriptionController.deletePrescription);
module.exports = router;