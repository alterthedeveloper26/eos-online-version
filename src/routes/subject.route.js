const express = require("express");
const router = express.Router();

const subjectController = require("../app/controllers/subject.controller");

const passport = require("../app/middlewares/passport");

router.get(
  "/questions",
  passport.authenticate("jwt", { session: false }),
  subjectController.getAllQuestions
);
router.get("/mockup", subjectController.createTestData);
router.post(
  "/submission",
  passport.authenticate("jwt", { session: false }),
  subjectController.submitExam
);

module.exports = router;
