const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isEmailVerified: { type: Boolean, default: false },
});

userSchema.method("validateUser", async function (password) {
  const isValid = await bcrypt.compare(password, this.password);
  return isValid;
});

userSchema.plugin(uniqueValidator);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
