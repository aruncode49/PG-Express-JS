const mongoose = require("mongoose");

// Create User Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create Model Using the User Schema
const User = mongoose.model("user", userSchema);

module.exports = User;
