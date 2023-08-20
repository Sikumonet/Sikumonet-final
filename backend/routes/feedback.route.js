const router = require("express").Router();
const { ADMIN, USER } = require("../constants/user-roles.constants");
const {
  getAllFeedbacks,
  getAllFeedbacksRelatedToSummary,
  getSingleFeedback,
  createFeedback,
  updateSingleFeedback,
  deleteSingleFeedback,
} = require("../controllers/feedback.controller");

//Public Routes
router.get("/summary/:id", getAllFeedbacksRelatedToSummary);
router.get("/", getAllFeedbacks);
router.get("/:id", getSingleFeedback);
router.post("/", createFeedback);
router.put("/:id", updateSingleFeedback);
router.delete("/:id", deleteSingleFeedback);

//Private Routes

module.exports = router;
