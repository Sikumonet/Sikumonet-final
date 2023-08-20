const mongoose = require("mongoose");

const institutionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Please enter the location"],
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("institutions", institutionSchema);
