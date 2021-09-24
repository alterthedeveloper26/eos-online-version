const express = require("express");
const router = express.Router();
const subjectController = require("../app/controllers/SubjectController");

router.get("/questions", subjectController.getAllQuestions);
router.get("/mockup", subjectController.createTestData);

module.exports = router;
