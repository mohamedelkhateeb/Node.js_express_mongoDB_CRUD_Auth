const usersDB = require("../models/User.model");
const bcrypt = require("bcryptjs");
const generateJWT = require("../utils/generateJWT");
const UserModel = require("../models/User.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().populate(
      "courses",
      "title description price"
    ); // Populate courses
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const matchedPass = await bcrypt.compare(password, user.password);
    if (!matchedPass) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const accessToken = await generateJWT({ email: user.email, id: user._id });
    user.Token = accessToken; // Optional: If you want to store the token in DB
    await user.save();
    const { password: _, ...userData } = user.toObject(); // Exclude password from response
    return res.status(200).json({
      message: "Login successful",
      user: userData,
      token: accessToken,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error", error: err.message });
  }
};
const register = async (req, res) => {
  const { email, password, fName, lName } = req.body;
  const isExistingUser = await usersDB.findOne({ email });
  if (isExistingUser) {
    return res.status(400).json("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new usersDB({
    fName,
    lName,
    email,
    password: hashedPassword,
  });
  const accessToken = await generateJWT({
    email: newUser.email,
    id: newUser._id,
  });
  // newUser.Token = accessToken;
  await newUser.save();
  res.status(201).json({ newUser });
};

module.exports = {
  getAllUsers,
  login,
  register,
};
