const asyncHandler = require("express-async-handler");
const LibrarySchema = require("../models/library.model");
const { decodeJwt } = require("../utils/decode-jwt");

// @Description  - Get all libraries related to user
// @Route - GET /api/v1/library/user/:id
// @Access - Public
const getAllLibrariesRelatedToUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    console.log("sasd");
    const libraries = await LibrarySchema.find({
      user: id,
    }).populate("subject");
    if (libraries.length === 0) {
      res.status(400).json({ message: "Libraries not found..!!" });
      throw new Error("Libraries not found..!!");
    }
    return res.status(200).json(libraries);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Create a library
// @Route - POST /api/v1/library
// @Access - Public
const createLibrary = asyncHandler(async (req, res) => {
  try {
    const { subject } = req.body;
    if (!subject) {
      res.status(400).json({ message: "Please fill all fields..!!" });
      throw new Error("Please fill all fields..!!");
    }
    const accessToken = req.headers["authorization"];
    const author = decodeJwt(accessToken);
    const existingLibrary = await LibrarySchema.findOne({
      user: author.id,
      subject: subject,
    });
    if (existingLibrary) {
      res
        .status(400)
        .json({ message: "You have already added this into your library..!!" });
      throw new Error("You have already added this into your library..!!");
    }
    const createdLibrary = await LibrarySchema.create({
      user: author.id,
      subject: subject,
    });
    if (createdLibrary) {
      res.status(201).json(createdLibrary);
    } else {
      res.status(400).json({ message: "Invalid library data..!!" });
      throw new Error("Invalid library data..!!");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Delete single library
// @Route - DELETE /api/v1/library/:id
// @Access - Public
const deleteSingleLibrary = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const libraryItem = await LibrarySchema.findById(id);
    if (!libraryItem) {
      res.status(400).json({ message: "Library not found..!!" });
      throw new Error("Library not found..!!");
    }
    await LibrarySchema.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Library deleted successfully..!!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  getAllLibrariesRelatedToUser,
  createLibrary,
  deleteSingleLibrary,
};
