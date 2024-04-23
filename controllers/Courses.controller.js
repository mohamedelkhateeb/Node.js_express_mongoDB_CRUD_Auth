const coursesDB = require("../models/course.model");
const { body, validationResult } = require("express-validator");

const getAllCourses = async (req, res) => {
	const courses = await coursesDB.find();
	console.log(courses);
	res.json(courses);
};

const getCourseById = async (req, res) => {
	const { id } = req.params;

	try {
		const course = await coursesDB.findById(id);
		if (!course) {
			return res.status(404).json({ Msg: "Course not found" });
		}
		res.send(course);
	} catch (error) {
		return res.status(404).json({ Msg: "Invalid Object ID" });
	}
};

const createCourse = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array().map((e) => e.msg) });
	}
	const newCourse = new coursesDB(req.body);
	await newCourse.save();
	res.status(201).json(newCourse);
};

const updateCourse = async (req, res) => {
	const { id } = req.params;
	try {
		let updatedCourse = await coursesDB.findByIdAndUpdate(id, {
			$set: { ...req.body },
		});
		if (!updatedCourse) {
			return res.status(404).send("Course not found");
		}
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array().map((e) => e.msg) });
		}
		res.status(202).json(updatedCourse);
	} catch (error) {
		return res.status(404).send("Invalid Object ID");
	}
};

const deleteCourse = async (req, res) => {
	const { id } = req.params;
	try {
		const course = await coursesDB.findByIdAndDelete(id);
		if (!course) {
			return res.status(404).send({ MSG: "Course not found" });
		}
		res.json({ MSG: "Course deleted successfully" });
	} catch (error) {
		res.status(404).json({ MSG: "Invalid Object ID" });
	}
};

module.exports = {
	getAllCourses,
	getCourseById,
	createCourse,
	updateCourse,
	deleteCourse,
};
