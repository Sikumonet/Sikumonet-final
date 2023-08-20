const asyncHandler = require("express-async-handler");
const DegreeProgramSchema = require("../models/degree-program.model");
const cloudinary = require("../config/cloudinary.config");

// @Description  - Get all degree programs
// @Route - GET /api/v1/degree-program
// @Access - Public
const getAllDegreePrograms = asyncHandler(async (req, res) => {
  try {
    const allDegreePrograms = await DegreeProgramSchema.find().populate(
      "institution"
    );
    return res.status(200).json(allDegreePrograms);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Get all degree programs related to institution
// @Route - GET /api/v1/degree-program/university/:id
// @Access - Public
const getAllDegreeProgramsRelatedToInstitution = asyncHandler(
  async (req, res) => {
    try {
      const { id } = req.params;
      const degreePrograms = await DegreeProgramSchema.find({
        institution: id,
      });
      if (degreePrograms.length === 0) {
        res.status(400).json({ message: "Degree Programs not found..!!" });
        throw new Error("Degree Programs not found..!!");
      }
      return res.status(200).json(degreePrograms);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

// @Description  - Get single degree program
// @Route - GET /api/v1/degree-program/:id
// @Access - Public
const getSingleDegreeProgram = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const degreeProgram = await DegreeProgramSchema.findById(id).populate(
      "institution"
    );
    if (!degreeProgram) {
      res.status(400).json({ message: "Degree Program not found..!!" });
      throw new Error("Degree Program not found..!!");
    }
    return res.status(200).json(degreeProgram);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Create a degree program
// @Route - POST /api/v1/degree-program
// @Access - Public
const createDegreeProgram = asyncHandler(async (req, res) => {
  try {
    const { name, institution, imageFile } = req.body;
    if (!name || !institution || !imageFile) {
      res.status(400).json({ message: "Please fill all fields..!!" });
      throw new Error("Please fill all fields..!!");
    }

    const result = await cloudinary.uploader.upload(imageFile, {
      folder: "degree-programs",
    });
    console.log("Cloudinary Degree Program : ", result);

    const createdDegreeProgram = await DegreeProgramSchema.create({
      name: name,
      institution: institution,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    if (createdDegreeProgram) {
      res.status(201).json(createdDegreeProgram);
    } else {
      res.status(400).json({ message: "Invalid degree program data..!!" });
      throw new Error("Invalid degree program data..!!");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Update single degree program
// @Route - PUT /api/v1/degree-program/:id
// @Access - Public
const updateSingleDegreeProgram = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location } = req.body;
    const degreeProgram = await DegreeProgramSchema.findById(id);
    if (!degreeProgram) {
      res.status(400).json({ message: "Degree Program not found..!!" });
      throw new Error("Degree Program not found..!!");
    }
    const updates = {
      name,
      location,
    };
    const updatedDegreeProgram = await DegreeProgramSchema.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
      }
    );
    return res.status(200).json(updatedDegreeProgram);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Delete single degree program
// @Route - DELETE /api/v1/degree-program/:id
// @Access - Public
const deleteSingleDegreeProgram = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const degreeProgram = await DegreeProgramSchema.findById(id);
    if (!degreeProgram) {
      res.status(400).json({ message: "Degree Program not found..!!" });
      throw new Error("Degree Program not found..!!");
    }
    await DegreeProgramSchema.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Degree Program deleted successfully..!!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  getAllDegreePrograms,
  getAllDegreeProgramsRelatedToInstitution,
  getSingleDegreeProgram,
  createDegreeProgram,
  updateSingleDegreeProgram,
  deleteSingleDegreeProgram,
};
