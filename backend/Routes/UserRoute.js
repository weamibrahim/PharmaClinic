const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/Authentication");
const upload= require("../Middleware/Upload");
// Import the UserController
const UserController = require("../Controller/UserController");
const {verifyRoleAdmin}= require("../Middleware/Authorization")
// Define the routes
router.get("/", verifyToken,verifyRoleAdmin,UserController.GetUsers)
router.get("/all", verifyToken, UserController.getAllUser);
router.post("/register",upload.single("photo"), UserController.register);
router.post("/login", UserController.login);
router.put("/:id",upload.single("photo"), verifyToken, UserController.updateUser);
router.put("/role/:id",verifyToken,verifyRoleAdmin,UserController.updateRoleOfUser)
router.delete("/:id", verifyToken,verifyRoleAdmin, UserController.deleteUser);

router.post("/forgot-password", UserController.forgetPassword);
router.post("/reset-password",verifyToken, UserController.resetPassword);


// Export the router
module.exports = router;