const mongoose = require("mongoose");

const academicYearSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name"],
      trim: true,
    },
    yearValue: {
      type: Number,
      required: [true, "Please enter the year value"],
      trim: true,
    },
    // Relations are going from here
    institution: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "institutions",
      required: true,
    },
    degreeProgram: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "degree-programs",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("academic-years", academicYearSchema);
