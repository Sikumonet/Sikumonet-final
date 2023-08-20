const asyncHandler = require("express-async-handler");
const SubjectSchema = require("../models/subject.model");
const cloudinary = require("../config/cloudinary.config");

// @Description  - Get all subject
// @Route - GET /api/v1/subject
// @Access - Public
const getAllSubjects = asyncHandler(async (req, res) => {
  try {
    const allSubjects = await SubjectSchema.find();
    return res.status(200).json(allSubjects);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Get all subjects related to academic year
// @Route - GET /api/v1/subject/academic-year/:id
// @Access - Public
const getAllSubjectsRelatedToAcademicYear = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const subjects = await SubjectSchema.find({
      academicYear: id,
    });
    if (subjects.length === 0) {
      res.status(400).json({ message: "Subjects not found..!!" });
      throw new Error("Subjects not found..!!");
    }
    return res.status(200).json(subjects);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Get single subject
// @Route - GET /api/v1/subject/:id
// @Access - Public
const getSingleSubject = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await SubjectSchema.findById(id);
    if (!subject) {
      res.status(400).json({ message: "Subject not found..!!" });
      throw new Error("Subject not found..!!");
    }
    return res.status(200).json(subject);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Create a subject
// @Route - POST /api/v1/subject
// @Access - Public
const createSubject = asyncHandler(async (req, res) => {
  try {
    const { name, institution, degreeProgram, academicYear, imageFile } =
      req.body;
    if (
      !name ||
      !institution ||
      !degreeProgram ||
      !academicYear ||
      !imageFile
    ) {
      res.status(400).json({ message: "Please fill all fields..!!" });
      throw new Error("Please fill all fields..!!");
    }

    const result = await cloudinary.uploader.upload(imageFile, {
      folder: "subjects",
    });
    console.log("Cloudinary Subject : ", result);

    const createdSubject = await SubjectSchema.create({
      name: name,
      institution: institution,
      degreeProgram: degreeProgram,
      academicYear: academicYear,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    if (createdSubject) {
      res.status(201).json(createdSubject);
    } else {
      res.status(400).json({ message: "Invalid subject data..!!" });
      throw new Error("Invalid subject data..!!");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Update single subject
// @Route - PUT /api/v1/subject/:id
// @Access - Public
const updateSingleSubject = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, academicYear } = req.body;
    const subject = await SubjectSchema.findById(id);
    if (!subject) {
      res.status(400).json({ message: "Subject not found..!!" });
      throw new Error("Subject not found..!!");
    }
    const updates = {
      name,
      academicYear,
    };
    const updatedSubject = await SubjectSchema.findByIdAndUpdate(id, updates, {
      new: true,
    });
    return res.status(200).json(updatedSubject);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Delete single subject
// @Route - DELETE /api/v1/subject/:id
// @Access - Public
const deleteSingleSubject = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await SubjectSchema.findById(id);
    if (!subject) {
      res.status(400).json({ message: "Subject not found..!!" });
      throw new Error("Subject not found..!!");
    }
    await SubjectSchema.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Subject deleted successfully..!!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  getAllSubjects,
  getAllSubjectsRelatedToAcademicYear,
  getSingleSubject,
  createSubject,
  updateSingleSubject,
  deleteSingleSubject,
};
