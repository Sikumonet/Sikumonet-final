const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name"],
      trim: true,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
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
    academicYear: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "academic-years",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("subjects", subjectSchema);
