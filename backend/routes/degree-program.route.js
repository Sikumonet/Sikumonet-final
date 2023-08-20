const router = require("express").Router();
const { ADMIN, USER } = require("../constants/user-roles.constants");
const {
  getAllDegreePrograms,
  getAllDegreeProgramsRelatedToInstitution,
  getSingleDegreeProgram,
  createDegreeProgram,
  updateSingleDegreeProgram,
  deleteSingleDegreeProgram,
} = require("../controllers/degree-program.controller");

//Public Routes
router.get("/university/:id", getAllDegreeProgramsRelatedToInstitution);
router.get("/", getAllDegreePrograms);
router.get("/:id", getSingleDegreeProgram);
router.post("/", createDegreeProgram);
router.put("/:id", updateSingleDegreeProgram);
router.delete("/:id", deleteSingleDegreeProgram);

//Private Routes

module.exports = router;
