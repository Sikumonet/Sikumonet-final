const router = require("express").Router();
const { ADMIN, USER } = require("../constants/user-roles.constants");
const {
  getAllAcademicYears,
  getAllAcademicYearsRelatedToDegreeProgram,
  getSingleAcademicYear,
  createAcademicYear,
  updateSingleAcademicYear,
  deleteSingleAcademicYear,
} = require("../controllers/academic-year.controller");

//Public Routes
router.get("/degree/:id", getAllAcademicYearsRelatedToDegreeProgram);
router.get("/", getAllAcademicYears);
router.get("/:id", getSingleAcademicYear);
router.post("/", createAcademicYear);
router.put("/:id", updateSingleAcademicYear);
router.delete("/:id", deleteSingleAcademicYear);

//Private Routes

module.exports = router;
