const express = require("express");
const verifyASPToken = require("../middleware/varifyASPToken");

const router = express.Router();

const soketController = require("../controllers/socket.controller");
router.get("/", verifyASPToken, usersController.getAllUsers);
router.post("/register", usersController.register);
router.post("/login", usersController.login);

module.exports = router;
