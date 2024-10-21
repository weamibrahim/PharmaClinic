const express = require("express");
const router = express.Router();

const verifyToken = require("../Middleware/Authentication");
const { verifyRolePharmacist } = require("../Middleware/Authorization");

// Import the MedicineController
const MedicineController = require("../Controller/Medicine Controller");

// Define the routes

router.get("/",verifyToken,  MedicineController.getMedicines);
router.get("/name",verifyToken,  MedicineController.getAllMedicinesByName);
router.get("/:id",verifyToken,  MedicineController.getMedicineById);

router.post("/",verifyToken, verifyRolePharmacist, MedicineController.createMedicine);
router.put("/:id",verifyToken, verifyRolePharmacist, MedicineController.updateMedicine);
router.delete("/:id",verifyToken, verifyRolePharmacist, MedicineController.deleteMedicine);

// Export the router
module.exports = router;