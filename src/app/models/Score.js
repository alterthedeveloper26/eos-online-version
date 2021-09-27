const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  subject_code: String,
  score: Number,
  user: String,
});

const scoreModel = mongoose.model("score", ScoreSchema);

module.exports = scoreModel;
