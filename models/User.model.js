const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  fName: { type: String },
  lName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  Token: { type: String },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

module.exports = mongoose.model("User", userSchema);
