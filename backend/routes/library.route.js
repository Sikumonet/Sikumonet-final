const router = require("express").Router();
const { ADMIN, USER } = require("../constants/user-roles.constants");
const {
  getAllLibrariesRelatedToUser,
  createLibrary,
  deleteSingleLibrary,
} = require("../controllers/library.controller");

//Public Routes
router.get("/user/:id", getAllLibrariesRelatedToUser);
router.post("/", createLibrary);
router.delete("/:id", deleteSingleLibrary);

//Private Routes

module.exports = router;
