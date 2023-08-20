const router = require("express").Router();
const { ADMIN, USER } = require("../constants/user-roles.constants");
const {
  getAllSubjects,
  getAllSubjectsRelatedToAcademicYear,
  getSingleSubject,
  createSubject,
  updateSingleSubject,
  deleteSingleSubject,
} = require("../controllers/subject.controller");

//Public Routes
router.get("/academic-year/:id", getAllSubjectsRelatedToAcademicYear);
router.get("/", getAllSubjects);
router.get("/:id", getSingleSubject);
router.post("/", createSubject);
router.put("/:id", updateSingleSubject);
router.delete("/:id", deleteSingleSubject);

//Private Routes

module.exports = router;
