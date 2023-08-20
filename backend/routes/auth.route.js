const router = require("express").Router();
const {
  signInUser,
  signUpUser,
  getLoggedInUser,
} = require("../controllers/auth.controller");

//Public Routes
router.post("/sign-in", signInUser);
router.post("/sign-up", signUpUser);
router.get("/logged-in-user", getLoggedInUser);

//Private Routes

module.exports = router;
