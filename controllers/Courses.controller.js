const courseModel = require("../models/course.model");
const { body, validationResult } = require("express-validator");
const UserModel = require("../models/User.model");

const getAllCourses = async (req, res) => {
  try {
    const courses = await courseModel
      .find()
      .populate("createdBy", "fName lName email");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await courseModel.findById(id);
    if (!course) {
      return res.status(404).json({ Msg: "Course not found" });
    }
    res.send(course);
  } catch (error) {
    return res.status(404).json({ Msg: "Invalid Object ID" });
  }
};

const createCourse = async (req, res) => {
  const { title, author, description, price } = req.body;
  const userId = req.currentUser.id;
  try {
    const course = await courseModel.create({
      title,
      author,
      description,
      price,
      createdBy: userId,
    });

    await UserModel.findByIdAndUpdate(userId, {
      $push: { courses: course._id },
    });

    res.status(201).json({ message: "Course created successfully", course });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  try {
    let updatedCourse = await courseModel.findByIdAndUpdate(id, {
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
    const course = await courseModel.findByIdAndDelete(id);
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
