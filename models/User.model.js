const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  fName: {
    type: String,
  },
  lName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
		validate:[validator.isEmail, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("User", userSchema);
