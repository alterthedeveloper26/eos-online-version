const SubjectModel = require("../models/Subject");
const ScoreModel = require("../models/Score");
const { success } = require("../../helper/format-response");
const _ = require("lodash");

class SubjectController {
  // [GET] /subject/questions
  getAllQuestions(req, res, next) {
    SubjectModel.find()
      .then((subjects) => {
        console.log(subjects);
        success(res, subjects);
      })
      .catch(next);
  }

  // [POST] /subject/submission
  async submitExam(req, res, next) {
    try {
      const { code, answers } = { ...req.body };
      const { questions } = await SubjectModel.findOne({
        code,
      }).onlyQuestions();

      const rightAnswers = [];
      questions.forEach((question) => {
        let { correctAnswers, _id } = question;
        _id = _id.toString();
        rightAnswers.push({
          correctAnswers,
          _id,
        });
      });

      let point = 0;
      answers.forEach((answer) => {
        const toCheck = rightAnswers.find(({ _id }) => _id === answer.id);
        if (_.isEqual(answer.answer, toCheck.correctAnswers)) point++;
      });

      const score = new ScoreModel({
        subject_code: code,
        score: point,
        user: req.user._id,
      });

      score.save().then(() => {
        console.log("Save succesfully!");
      });

      return res.status(200).json({
        message: "Submit successfully!",
      });
    } catch (err) {
      next(err);
    }
  }

  createTestData(req, res, next) {
    const testObject = new SubjectModel({
      name: "Marxism and Leninism",
      questions: [
        {
          content: "Is heracles the best hero?",
          correctAnswers: [1],
          answers: [
            {
              id: 1,
              content: "Yes",
            },
            {
              id: 2,
              content: "No",
            },
          ],
        },
        {
          content: "Is archiles Hoang's favorite hero?",
          correctAnswers: [1],
          answers: [
            {
              id: 1,
              content: "Yes",
            },
            {
              id: 2,
              content: "No",
            },
          ],
        },
      ],
    });

    testObject.save().then(() => {
      console.log("Save succesfully!");
    });

    return res.send({ message: "Successfully created!!!" });
  }
}

module.exports = new SubjectController();
