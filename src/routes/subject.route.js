const express = require("express");
const router = express.Router();
const subjectController = require("../app/controllers/SubjectController");

router.get("/", subjectController.getAllQuestions);

module.exports = router;
