const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      dosage: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      price:{
        type: Number,
        required: true,
      }
    },
    {
      timestamps: true
    }
  );
  
  module.exports = mongoose.model("Medicine", medicineSchema)