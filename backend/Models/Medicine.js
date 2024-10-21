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
    },
    {
      timestamps: true
    }
  );
  
  module.exports = mongoose.model("Medicine", medicineSchema)