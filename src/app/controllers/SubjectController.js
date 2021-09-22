const SubjectModel = require("../models/Subject");
const success = require("../../helper/format-response");

class SubjectController {
  getAllQuestions(req, res, next) {
    SubjectModel.find()
      .then((subjects) => {
        console.log(subjects);
        success(res, subjects);
      })
      .catch(next);
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
  }
}

module.exports = new SubjectController();
