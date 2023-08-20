const asyncHandler = require("express-async-handler");
const RearwardSchema = require("../models/rearward.model");
const {
  RATING_WEIGHT,
  DOWNLOAD_WEIGHT,
  FEEDBACK_WEIGHT,
} = require("../constants/reawards.contants");

// @Description  - Get rearwards related to user
// @Route - GET /api/v1/rearward/user/:id
// @Access - Public
const getRearwardRelatedToUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const rearward = await RearwardSchema.find({
      user: id,
    }).populate("user");
    if (rearward.length === 0) {
      res.status(400).json({ message: "Rearward not found..!!" });
      throw new Error("Rearward not found..!!");
    }
    return res.status(200).json(rearward);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Create a rearward
// @Route - No end-point to the public usage
// @Access - Public
const createRearward = asyncHandler(async (userId) => {
  try {
    const createdRearward = await RearwardSchema.create({
      ratingScore: 0,
      downloadScore: 0,
      feedbackScore: 0,
      totalScore: 0,
      user: userId,
    });
    if (createdRearward) {
      console.log(createdRearward);
    } else {
      throw new Error("Invalid rearward data..!!");
    }
  } catch (error) {
    console.error(error);
  }
});

// @Description  - Update rearward
// @Route - PUT /api/v1/rearward/:id
// @Access - Public
const updateSingleRearward = asyncHandler(
  async (id, ratingScore, downloadScore, feedbackScore) => {
    try {
      const RATING_WEIGHT = 0.4;
      const DOWNLOAD_WEIGHT = 0.3;
      const FEEDBACK_WEIGHT = 0.3;

      const rearward = await RearwardSchema.findById({ user: id });
      if (!rearward) {
        throw new Error("Rearward not found..!!");
      }

      // Calculate updated scores
      const updatedRatingScore =
        (rearward.ratingScore || 0) + (ratingScore || 0);
      const updatedDownloadScore =
        (rearward.downloadScore || 0) + (downloadScore || 0);
      const updatedFeedbackScore =
        (rearward.feedbackScore || 0) + (feedbackScore || 0);

      // Calculate updated total score
      const updatedTotalScore =
        updatedRatingScore * RATING_WEIGHT +
        updatedDownloadScore * DOWNLOAD_WEIGHT +
        updatedFeedbackScore * FEEDBACK_WEIGHT;

      // Prepare updates based on what's provided
      const updates = {
        ratingScore: updatedRatingScore,
        downloadScore: updatedDownloadScore,
        feedbackScore: updatedFeedbackScore,
        totalScore: updatedTotalScore,
      };

      // Update the rearward document with the calculated scores
      const updatedRearward = await RearwardSchema.findByIdAndUpdate(
        id,
        updates,
        {
          new: true,
        }
      );

      console.log(updatedRearward);
      return updatedRearward;
    } catch (error) {
      console.error(error);
    }
  }
);

module.exports = {
  getRearwardRelatedToUser,
  createRearward,
  updateSingleRearward,
};
