const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OTPSchema = new Schema({
  code: String,
  email: String,
});

const OTPModel = mongoose.model("otp", OTPSchema);

module.exports = OTPModel;
