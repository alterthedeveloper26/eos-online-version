const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  id: Number,
  content: String,
});

const AnswerModel = mongoose.model("Answer", answerSchema);

module.exports = { answerSchema, AnswerModel };
