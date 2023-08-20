const mongoose = require("mongoose");

const librarySchema = mongoose.Schema(
  {
    // Relations are going from here
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subjects",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("libraries", librarySchema);
