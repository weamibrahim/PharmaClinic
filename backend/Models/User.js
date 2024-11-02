const e = require("express");
const mongoose = require("mongoose");
const Patient = require("./Patient");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    
    
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["doctor", "pharmacist ","admin"],
    default: "doctor",
  },
  patient:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
  ]
});

module.exports = mongoose.model("User", userSchema);
