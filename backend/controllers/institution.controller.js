const asyncHandler = require("express-async-handler");
const InstitutionSchema = require("../models/institution.model");
const cloudinary = require("../config/cloudinary.config");

// @Description  - Get all institutions
// @Route - GET /api/v1/institution
// @Access - Public
const getAllInstitutions = asyncHandler(async (req, res) => {
  try {
    const { name, sort } = req.query;

    //Filtering options start from here
    let query = {};
    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    //Sorting options start from here
    let sortOption = {};
    if (sort === "asc") {
      sortOption.name = 1; // Ascending order
    } else if (sort === "desc") {
      sortOption.name = -1; // Descending order
    }

    //Get the data from the institutions
    const allInstitutions = await InstitutionSchema.find(query).sort(
      sortOption
    );

    return res.status(200).json(allInstitutions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Get single institution
// @Route - GET /api/v1/institution/:id
// @Access - Public
const getSingleInstitution = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const institution = await InstitutionSchema.findById(id);
    if (!institution) {
      res.status(400).json({ message: "Institution not found..!!" });
      throw new Error("Institution not found..!!");
    }
    return res.status(200).json(institution);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Create a institution
// @Route - POST /api/v1/institution
// @Access - Public
const createInstitution = asyncHandler(async (req, res) => {
  try {
    const { name, location, imageFile } = req.body;
    if (!name || !location || !imageFile) {
      res.status(400).json({ message: "Please fill all fields..!!" });
      throw new Error("Please fill all fields..!!");
    }

    const result = await cloudinary.uploader.upload(imageFile, {
      folder: "institution",
    });
    console.log("Cloudinary Institution : ", result);

    const createdInstitution = await InstitutionSchema.create({
      name: name,
      location: location,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    if (createdInstitution) {
      res.status(201).json(createdInstitution);
    } else {
      res.status(400).json({ message: "Invalid institution data..!!" });
      throw new Error("Invalid institution data..!!");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Update single institution
// @Route - PUT /api/v1/institution/:id
// @Access - Public
const updateSingleInstitution = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location } = req.body;
    const institution = await InstitutionSchema.findById(id);
    if (!institution) {
      res.status(400).json({ message: "Institution not found..!!" });
      throw new Error("Institution not found..!!");
    }
    const updates = {
      name,
      location,
    };
    const updatedInstitution = await InstitutionSchema.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
      }
    );
    return res.status(200).json(updatedInstitution);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Delete single institution
// @Route - DELETE /api/v1/institution/:id
// @Access - Public
const deleteSingleInstitution = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const institution = await InstitutionSchema.findById(id);
    if (!institution) {
      res.status(400).json({ message: "Institution not found..!!" });
      throw new Error("Institution not found..!!");
    }
    await InstitutionSchema.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Institution deleted successfully..!!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  getAllInstitutions,
  getSingleInstitution,
  createInstitution,
  updateSingleInstitution,
  deleteSingleInstitution,
};
