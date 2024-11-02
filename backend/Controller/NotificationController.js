const Notification = require("../Models/Notifications");

const NotificationController = {};

NotificationController.getNotifications = async (req, res) => {
    console.log("req.user", req.user);

    try {
        if (req.user.role === "doctor") {
            const notifications = await Notification.find({  type: "addMedicine" }).sort({ createdAt: -1 });
            console.log("Fetched notifications for doctor:", notifications);  
            res.json({ notifications });
        } else if (req.user.role === "pharmacist") {
            const notifications = await Notification.find({  type: "addPrescription" }).sort({ createdAt: -1 });
            console.log("Fetched notifications for pharmacist:", notifications); 
            res.json({ notifications });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

NotificationController.deleteNotification = async (req, res) => {
    try {
        const deletedNotification = await Notification.findByIdAndDelete(req.params.id);
        res.json({ deletedNotification, message: "Notification deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


module.exports = NotificationController;