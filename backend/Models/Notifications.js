const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
   
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    notification: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["addMedicine", "addPrescription"],
        required: true,
    },
   
   
   
},
{
  timestamps: true
}
);

module.exports = mongoose.model("Notification", notificationSchema)
     