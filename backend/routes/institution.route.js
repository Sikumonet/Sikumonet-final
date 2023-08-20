const router = require("express").Router();
const { ADMIN, USER } = require("../constants/user-roles.constants");
const {
  getAllInstitutions,
  getSingleInstitution,
  createInstitution,
  updateSingleInstitution,
  deleteSingleInstitution,
} = require("../controllers/institution.controller");

//Public Routes
router.get("/", getAllInstitutions);
router.get("/:id", getSingleInstitution);
router.post("/", createInstitution);
router.put("/:id", updateSingleInstitution);
router.delete("/:id", deleteSingleInstitution);

//Private Routes

module.exports = router;
