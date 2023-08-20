const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, "Please enter the rating"],
      trim: true,
    },
    // Relations are going from here
    summaryAuthor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    summary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "summaries",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ratings", ratingSchema);
