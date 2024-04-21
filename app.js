const express = require("express");
const app = express();
const { body, validationResult } = require("express-validator");
const port = 5000;
app.use(express.json());

const coursesController = require("./controllers/Courses.controller");

//---------------------CRUD - Create Read Update Delete----------------
//1-Get all courses
app.get("/api/courses", coursesController.getAllCourses);
//2-Get single course
app.get("/api/courses/:id", coursesController.getCourseById);
//3-Add course
app.post(
	"/api/courses/create",
	body("name").notEmpty().withMessage("Course name is required"),
	body("author").notEmpty().withMessage("author name is required"),
	body("price").notEmpty().withMessage("price is required"),
	body("description").notEmpty().withMessage("description is required"),
	coursesController.createCourse
);
//4-Update course
app.put(
	"/api/courses/update/:id",
	body("name").notEmpty().withMessage("Course name is required"),
	body("author").notEmpty().withMessage("author name is required"),
	body("price").notEmpty().withMessage("price is required"),
	body("description").notEmpty().withMessage("description is required"),
	coursesController.updateCourse
);

//5-Delete course
app.delete("/api/courses/delete/:id", coursesController.deleteCourse);

//start server
app.listen(port, () => console.log("Listening on port " + port));
