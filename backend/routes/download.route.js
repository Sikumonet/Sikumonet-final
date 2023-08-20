const router = require("express").Router();
const { ADMIN, USER } = require("../constants/user-roles.constants");
const {
  getAllDownloads,
  getAllDownloadsRelatedToUser,
  getAllDownloadsRelatedToSummary,
  createDownload,
} = require("../controllers/download.controller");

//Public Routes
router.get("/user/:id", getAllDownloadsRelatedToUser);
router.get("/summary/:id", getAllDownloadsRelatedToSummary);
router.get("/", getAllDownloads);
router.post("/", createDownload);

//Private Routes

module.exports = router;
