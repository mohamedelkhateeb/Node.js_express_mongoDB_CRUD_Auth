const express = require("express");

const router = express.Router();

const coursesController = require("../controllers/Courses.controller");
const { body } = require("express-validator");

router.get("/", coursesController.getAllCourses);
router.get("/:id", coursesController.getCourseById);
router.post(
	"/create",
	body("title").notEmpty().withMessage("Course title is required"),
	body("author").notEmpty().withMessage("author title is required"),
	body("price").notEmpty().withMessage("price is required"),
	body("description").notEmpty().withMessage("description is required"),
	coursesController.createCourse
);
router.put(
	"/update/:id",
	body("title").notEmpty().withMessage("Course title is required"),
	body("author").notEmpty().withMessage("author title is required"),
	body("price").notEmpty().withMessage("price is required"),
	body("description").notEmpty().withMessage("description is required"),
	coursesController.updateCourse
);
router.delete("/delete/:id", coursesController.deleteCourse);

module.exports = router;
