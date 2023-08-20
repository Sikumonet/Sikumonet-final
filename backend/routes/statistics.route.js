const router = require("express").Router();
const { ADMIN, USER } = require("../constants/user-roles.constants");
const {
  getAdminStatistics,
  getUserStatistics,
} = require("../controllers/statistics.controller");

//Public Routes
router.get("/admin", getAdminStatistics);
router.get("/user", getUserStatistics);

//Private Routes

module.exports = router;
