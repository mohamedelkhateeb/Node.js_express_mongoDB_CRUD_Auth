const usersDB = require("../models/User.model");
const bcrypt = require("bcryptjs");
const generateJWT = require("../utils/generateJWT");
const getAllUsers = async (req, res) => {
  const users = await usersDB.find({}, { password: false });
  console.log(users);
  res.json(users);
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("Email and password are required");
  }
  const user = await usersDB.findOne({ email });
  if (!user) {
    return res.status(400).json("Invalid credentials");
  }
  const matchedPass = await bcrypt.compare(password, user.password);
  const accessToken = await generateJWT({ email: user.email, id: user._id });
  user.Token = accessToken;
  if (matchedPass && user) {
    return res.status(200).json(user.Token);
  } else {
    return res.status(400).json("Invalid credentials");
  }
};
const register = async (req, res) => {
  const { email, password, fName, lName } = req.body;
  const isExistingUser = await usersDB.findOne({ email });
  if (isExistingUser) {
    return res.status(400).json("User already exists");
  }
  const hashedPass = await bcrypt(password, 10);
  const newUser = new usersDB({
    fName,
    lName,
    email,
    password: hashedPass,
  });
  const accessToken = await generateJWT({ email: newUser.email, id: newUser._id });
  newUser.Token = accessToken;
  await newUser.save();
  res.status(201).json({ newUser });
};
module.exports = {
  getAllUsers,
  login,
  register,
};
