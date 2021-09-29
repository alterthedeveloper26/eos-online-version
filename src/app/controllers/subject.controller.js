const SubjectModel = require("../models/Subject");
const ScoreModel = require("../models/Score");
const UserModel = require("../models/User");

const wrapError = require("../../helper/errorWrapper");
const buildResponse = require("../../helper/responseBuilder");
const mockData = require("../../helper/mockupProvider");
const { calculateScore, getRightAnswer } = require("../../helper/grading");

const status = require("http-status");
const mockupProvider = require("../../helper/mockupProvider");

class SubjectController {
  //[GET] /subject/questions
  getAllQuestions = wrapError(async (req, res) => {
    const questions = await SubjectModel.find();
    const data = buildResponse(questions);
    res.status(status.OK).send(data);
  });

  // [POST] /subject/submission
  submitExam = wrapError(async (req, res) => {
    const { user } = req;
    const { code, answers } = { ...req.body };
    const { questions } = await SubjectModel.findOne({
      code,
    }).onlyQuestions();

    const rightAnswers = getRightAnswer(questions);

    const point = calculateScore(rightAnswers, answers);
    const score = new ScoreModel({
      subject_code: code,
      score: point,
      user: req.user._id,
    });
    await score.save();

    user.scores.push(score._id);
    await user.save();

    const data = buildResponse(score);
    return res.status(status.OK).send(data);
  });

  createTestData = wrapError(async (req, res) => {
    const testObject = new SubjectModel(mockupProvider);
    await testObject.save();
    const data = buildResponse();
    return res.status(status.OK).send(data);
  });
}

module.exports = new SubjectController();
