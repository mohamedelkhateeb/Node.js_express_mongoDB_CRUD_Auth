const express = require("express");
const varifyToken = require("../middleware/varifyToken");

const router = express.Router();

// const coursesController = require("../controllers/Courses.controller");
const usersController = require("../controllers/Users.controller");
router.get("/", varifyToken, usersController.getAllUsers);
router.post("/register", usersController.register);
router.post("/login", usersController.login);

module.exports = router;
