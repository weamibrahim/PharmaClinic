const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/Authentication");


// Import the MessageController
const MessageController = require("../Controller/MessageController");

// Define the routes
router.get("/:senderId/:receiverId",verifyToken, MessageController.getAllMessages);
router.post("/send",verifyToken, MessageController.sendMessage);
router.delete("/:id",verifyToken, MessageController.deleteMessage);
router.put("/:id",verifyToken, MessageController.updateMessage);

// Export the router
module.exports = router;