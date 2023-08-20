const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Please enter the content"],
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

module.exports = mongoose.model("feedbacks", feedbackSchema);
