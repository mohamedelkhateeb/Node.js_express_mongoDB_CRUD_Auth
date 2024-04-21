const courses = require("../data/data");

const getAllCourses = (req, res) => {
	res.json(courses);
};

const getCourseById = (req, res) => {
	const { id } = req.params;
	let course = courses.find((c) => id == c.id);
	if (!course) {
		return res.status(404).json({ Msg: "Course not found" });
	}
	res.send(course);
};

const createCourse = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array().map((e) => e.msg) });
	}
	courses.push({ id: courses.length + 1, ...req.body });
	res.status(201).json(req.body);
};

const updateCourse = (req, res) => {
	(req, res) => {
		const { id } = req.params;
		let course = courses.find((c) => id == c.id);
		if (!course) {
			return res.status(404).send("Course not found");
		}
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array().map((e) => e.msg) });
		}

		courses = courses.reduce((c) => (c.id == id ? course : c));
		course = { ...course, ...req.body };
		res.status(201).json(course);
	};
};

const deleteCourse = (req, res) => {
	const { id } = req.params;
	const course = courses.find((c) => id == c.id);
	console.log(course);
	if (!course) {
		return res.status(404).send("Course not found");
	}
	courses = courses.filter((c) => id != c.id);
	res.json({ MSG: "Course deleted successfully" });
};

module.exports = {
	getAllCourses,
	getCourseById,
	createCourse,
	updateCourse,
	deleteCourse,
};
