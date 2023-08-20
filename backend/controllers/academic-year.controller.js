const asyncHandler = require("express-async-handler");
const AcademicYearSchema = require("../models/academic-year.model");

// @Description  - Get all academic years
// @Route - GET /api/v1/academic-year
// @Access - Public
const getAllAcademicYears = asyncHandler(async (req, res) => {
  try {
    const allAcademicYears = await AcademicYearSchema.find();
    return res.status(200).json(allAcademicYears);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Get all academic year related to degree program
// @Route - GET /api/v1/academic-year/degree/:id
// @Access - Public
const getAllAcademicYearsRelatedToDegreeProgram = asyncHandler(
  async (req, res) => {
    try {
      const { id } = req.params;
      const degreePrograms = await AcademicYearSchema.find({
        degreeProgram: id,
      });
      if (degreePrograms.length === 0) {
        res.status(400).json({ message: "Academic years not found..!!" });
        throw new Error("Academic years not found..!!");
      }
      return res.status(200).json(degreePrograms);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

// @Description  - Get single academic year
// @Route - GET /api/v1/academic-year/:id
// @Access - Public
const getSingleAcademicYear = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const academicYear = await AcademicYearSchema.findById(id)
      .populate("degreeProgram")
      .populate("institution");
    if (!academicYear) {
      res.status(400).json({ message: "Academic year not found..!!" });
      throw new Error("Academic year not found..!!");
    }
    return res.status(200).json(academicYear);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Create a academic year
// @Route - POST /api/v1/academic-year
// @Access - Public
const createAcademicYear = asyncHandler(async (req, res) => {
  try {
    const { name, yearValue, institution, degreeProgram } = req.body;
    if (!name || !yearValue || !institution || !degreeProgram) {
      res.status(400).json({ message: "Please fill all fields..!!" });
      throw new Error("Please fill all fields..!!");
    }
    const createdAcademicYear = await AcademicYearSchema.create({
      name: name,
      yearValue: yearValue,
      institution: institution,
      degreeProgram: degreeProgram,
    });
    if (createdAcademicYear) {
      res.status(201).json(createdAcademicYear);
    } else {
      res.status(400).json({ message: "Invalid academic year data..!!" });
      throw new Error("Invalid academic year data..!!");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Update single academic year
// @Route - PUT /api/v1/academic-year/:id
// @Access - Public
const updateSingleAcademicYear = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location } = req.body;
    const academicYear = await AcademicYearSchema.findById(id);
    if (!academicYear) {
      res.status(400).json({ message: "Academic year not found..!!" });
      throw new Error("Academic year not found..!!");
    }
    const updates = {
      name,
      location,
    };
    const updatedAcademicYear = await AcademicYearSchema.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
      }
    );
    return res.status(200).json(updatedAcademicYear);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Delete single academic year
// @Route - DELETE /api/v1/academic-year/:id
// @Access - Public
const deleteSingleAcademicYear = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const academicYear = await AcademicYearSchema.findById(id);
    if (!academicYear) {
      res.status(400).json({ message: "Academic year not found..!!" });
      throw new Error("Academic year not found..!!");
    }
    await AcademicYearSchema.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Academic year deleted successfully..!!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  getAllAcademicYears,
  getAllAcademicYearsRelatedToDegreeProgram,
  getSingleAcademicYear,
  createAcademicYear,
  updateSingleAcademicYear,
  deleteSingleAcademicYear,
};
