const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { answerSchema } = require("./Answer");

const questionSchema = new Schema({
  content: String,
  answers: [answerSchema],
  correctAnswers: [Number],
});

const QuestionModel = mongoose.model("question", questionSchema);

module.exports = { questionSchema, QuestionModel };
