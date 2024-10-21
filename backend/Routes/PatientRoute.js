const express = require("express");
const router = express.Router();

// Import the PatientController
const PatientController = require("../Controller/PatientController");

const verifyToken = require("../Middleware/Authentication");
const {verifyRoleDoctor}= require("../Middleware/Authorization");


// Define the routes

router.get("/",verifyToken, verifyRoleDoctor, PatientController.getAllPatients);
router.get("/:id",verifyToken, verifyRoleDoctor, PatientController.getPatientById);
router.post("/",verifyToken, verifyRoleDoctor, PatientController.createPatient);
router.put("/:id",verifyToken, verifyRoleDoctor, PatientController.updatePatient);
router.delete("/:id",verifyToken, verifyRoleDoctor, PatientController.deletePatient);

// Define the routes

module.exports = router