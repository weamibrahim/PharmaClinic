const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/Authentication");


// Import the NotificationController
const NotificationController = require("../Controller/NotificationController");

// Define the routes
router.get("/",verifyToken, NotificationController.getNotifications);
router.delete("/:id",verifyToken, NotificationController.deleteNotification);


// Export the router
module.exports = router;