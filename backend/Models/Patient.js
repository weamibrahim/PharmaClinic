const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
 
  name: {
    type: String,
    required: true,   
  },
  age:{
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  }
  ,
  date: {
    type: Date,
    default: Date.now,
  },
  doctors:[
   
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    }
 ],

},{
  timestamps: true
});

module.exports = mongoose.model("Patient", patientSchema);