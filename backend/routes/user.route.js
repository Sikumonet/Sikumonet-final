const router = require("express").Router();
const { ADMIN, USER } = require("../constants/user-roles.constants");
const {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
} = require("../controllers/user.controller");

//Public Routes
router.get("/", getAllUsers);
router.get("/:id", getSingleUser);
router.put("/:id", updateSingleUser);
router.delete("/:id", deleteSingleUser);

//Private Routes

module.exports = router;
