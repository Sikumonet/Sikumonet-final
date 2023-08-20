const asyncHandler = require("express-async-handler");
const { decodeJwt } = require("../utils/decode-jwt");
const UserSchema = require("../models/user.model");
const InstitutionSchema = require("../models/institution.model");
const DegreeProgramSchema = require("../models/degree-program.model");
const SummarySchema = require("../models/summary.model");
const FeedbackSchema = require("../models/feedback.model");
const RatingSchema = require("../models/rating.model");
const DownloadSchema = require("../models/download.model");

// @Description  - Get admin statistics
// @Route - GET /api/v1/statistics/admin
// @Access - Public
const getAdminStatistics = asyncHandler(async (req, res) => {
  try {
    const totalUsers = await UserSchema.countDocuments();
    const totalInstitutions = await InstitutionSchema.countDocuments();
    const totalDegreePrograms = await DegreeProgramSchema.countDocuments();
    const totalSummaries = await SummarySchema.countDocuments();
    return res.status(200).json({
      totalUsers,
      totalInstitutions,
      totalDegreePrograms,
      totalSummaries,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @Description  - Get user statistics
// @Route - GET /api/v1/statistics/user
// @Access - Public
const getUserStatistics = asyncHandler(async (req, res) => {
  try {
    const accessToken = req.headers["authorization"];
    const author = decodeJwt(accessToken);
    const totalSummaries = await SummarySchema.countDocuments({
      user: author.id,
    });
    const totalRatingsForSpecificUser = await RatingSchema.countDocuments({
      summaryAuthor: author.id,
    });
    const totalFeedbacksForSpecificUser = await FeedbackSchema.countDocuments({
      summaryAuthor: author.id,
    });
    const totalDownloads = await DownloadSchema.countDocuments({
      summaryAuthor: author.id,
    });
    return res.status(200).json({
      totalSummaries,
      totalRatingsForSpecificUser,
      totalFeedbacksForSpecificUser,
      totalDownloads,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  getAdminStatistics,
  getUserStatistics,
};
