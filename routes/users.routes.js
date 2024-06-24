const express = require("express");

const router = express.Router();

// const coursesController = require("../controllers/Courses.controller");
const usersController = require("../controllers/Users.controller");
router.get("/", usersController.getAllUsers);
router.post("/register", usersController.register);
router.post("/login", usersController.login);

module.exports = router;
