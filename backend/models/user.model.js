const mongoose = require("mongoose");
const { ADMIN, USER } = require("../constants/user-roles.constants");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true],
      max: 64,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: [ADMIN, USER],
      default: USER,
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
    },
    userAvatar: {
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
    },
    // Relations are going from here
    institution: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "institutions",
      required: false,
    },
    degreeProgramme: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "degree-programs",
      required: false,
    },
    academicYear: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "academic-years",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
