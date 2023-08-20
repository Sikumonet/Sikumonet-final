const router = require("express").Router();
const { ADMIN, USER } = require("../constants/user-roles.constants");
const {
  getAllRatings,
  getAllRatingsRelatedToSummary,
  getSingleRating,
  createRating,
  deleteSingleRating,
} = require("../controllers/rating.controller");

//Public Routes
router.get("/summary/:id", getAllRatingsRelatedToSummary);
router.get("/", getAllRatings);
router.get("/:id", getSingleRating);
router.post("/", createRating);
router.delete("/:id", deleteSingleRating);

//Private Routes

module.exports = router;
