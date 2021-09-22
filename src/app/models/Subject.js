const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { questionSchema } = require("./Question");

//plugin
const slug = require("mongoose-slug-generator");

//plug in
mongoose.plugin(slug);

const subjectSchema = new Schema({
  name: String,
  code: { type: String, slug: "name" },
  questions: [questionSchema],
});

const SubjectModel = mongoose.model("subject", subjectSchema);

module.exports = SubjectModel;
