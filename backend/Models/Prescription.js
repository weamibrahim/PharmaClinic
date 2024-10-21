const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
 patientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Patient",
 },
 userId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
 },
 prescription: {
    type: String,
    required: true,
 },
 Date: {
    type: Date,
    default: Date.now,
 },
 IsRead: {
    type: Boolean,
    default: false,
 }
},
{
  timestamps: true
}
);

module.exports = mongoose.model("Prescription", prescriptionSchema)