const asyncHandler = require("express-async-handler");
const UserSchema = require("../models/user.model");
const { decodeJwt } = require("../utils/decode-jwt");
const cloudinary = require("../config/cloudinary.config");

// @Description  - Get all users
// @Route - GET /api/v1/user
// @Access - Public
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const { isFeatureProfile } = req.query;
    console.log(isFeatureProfile);
    const filters = {};

    // Apply filters if provided
    if (isFeatureProfile) {
      filters.isFeatureProfile = isFeatureProfile;
    }

    const allUsers = await UserSchema.find(filters);
    return res.status(200).json(allUsers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Get single user
// @Route - GET /api/v1/user/:id
// @Access - Public
const getSingleUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserSchema.findById(id)
      .populate("institution")
      .populate("degreeProgramme")
      .populate("academicYear");
    if (!user) {
      res.status(400).json({ message: "User not found..!!" });
      throw new Error("User not found..!!");
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Update single user
// @Route - PUT /api/v1/user/:id
// @Access - Public
const updateSingleUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, userAvatar, institution, degreeProgramme, academicYear } =
      req.body;
    console.log(userAvatar);
    const user = await UserSchema.findById(id);
    if (!user) {
      res.status(400).json({ message: "User not found..!!" });
      throw new Error("User not found..!!");
    }

    //Updating the data partially
    const updates = {};
    if (name) {
      updates.name = name;
    }
    if (institution) {
      updates.institution = institution;
    }
    if (degreeProgramme) {
      updates.degreeProgramme = degreeProgramme;
    }
    if (academicYear) {
      updates.academicYear = academicYear;
    }
    if (userAvatar) {
      const result = await cloudinary.uploader.upload(userAvatar, {
        folder: "users",
      });
      console.log("Cloudinary : ", result);
      updates.userAvatar = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }
    // Saving updating data into the database
    const updatedUser = await UserSchema.findByIdAndUpdate(id, updates, {
      new: true,
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Delete single user
// @Route - DELETE /api/v1/user/:id
// @Access - Public
const deleteSingleUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserSchema.findById(id);
    if (!user) {
      res.status(400).json({ message: "User not found..!!" });
      throw new Error("User not found..!!");
    }
    await UserSchema.findByIdAndDelete(id);
    return res.status(200).json({ message: "User deleted successfully..!!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
