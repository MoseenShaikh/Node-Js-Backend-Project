const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  jobTitle: {
    type: String
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department", // Relation with Department
    required: true
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee", // Self-reference
    default: null
  },
  country: {
    type: String
  },
  state: {
    type: String
  },
  city: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Employee", employeeSchema);
