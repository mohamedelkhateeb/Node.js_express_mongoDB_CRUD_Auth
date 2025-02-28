const express = require("express");
const verifyASPToken = require("../middleware/varifyASPToken");

const router = express.Router();

const usersController = require("../controllers/Users.controller");
router.get("/", usersController.getAllUsers);
router.post("/register", usersController.register);
router.post("/login", usersController.login);

module.exports = router;
