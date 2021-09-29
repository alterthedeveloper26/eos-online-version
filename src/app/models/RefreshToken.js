const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RefreshTokenSchema = new Schema(
  {
    user: String,
    token: String,
  },
  {
    timestamps: true,
  }
);

const RefreshTokenModel = mongoose.model("token", RefreshTokenSchema);

module.exports = RefreshTokenModel;
