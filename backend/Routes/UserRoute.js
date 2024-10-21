const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/Authentication");
const upload= require("../Middleware/Upload");
// Import the UserController
const UserController = require("../Controller/UserController");

// Define the routes

router.post("/register",upload.single("photo"), UserController.register);
router.post("/login", UserController.login);
router.put("/:id",upload.single("photo"), verifyToken, UserController.updateUser);
router.delete("/:id", verifyToken, UserController.deleteUser);


// Export the router
module.exports = router;