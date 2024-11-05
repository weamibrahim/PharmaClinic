const Message = require("../Models/Message");

const MessageController = {};

MessageController.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    await newMessage.save();

    const roomName = [senderId, receiverId].sort().join('-');
    global.io.to(roomName).emit("newMessage", newMessage);

  
    // global.io.to(receiverId.toString()).emit("newMessage", newMessage);
    // global.io.to(senderId.toString()).emit("newMessage", newMessage);

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
MessageController.getAllMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });
    res.status(200).json({ messages });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
MessageController.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    if (!message.senderId.equals(req.user.userId)) {
      return res
        .status(400)
        .json({ message: "You can only delete your own messages" });
    }

    await Message.findByIdAndDelete(id);

    global.io.emit("messageDeleted", id);

    return res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
MessageController.updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const oldMessage = await Message.findById(id);
    if (!oldMessage.senderId.equals(req.user.userId)) {
      return res
        .status(400)
        .json({ message: "You can only update your own messages" });
    }
    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { message },
      { new: true }
    );

    global.io.emit("messageUpdated", updatedMessage);

    res
      .status(200)
      .json({ message: "Message updated successfully", updatedMessage });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = MessageController;
