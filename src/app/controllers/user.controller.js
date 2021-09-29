const status = require("http-status");
const UserModel = require("../models/User");
const ApiError = require("../../helper/apiError");
const wrapError = require("../../helper/errorWrapper");
const buildResponse = require("../../helper/responseBuilder");
const { response } = require("express");

class UserController {
  //[GET] /user
  getAll = wrapError(async (req, res) => {
    const _id = req.params.id;
    const result = await UserModel.find().select(["-__v", "-password"]);
    if (!result) {
      return next(
        new ApiError(status.NOT_FOUND),
        "There has been any user, yet!"
      );
    }
    const data = buildResponse(result);
    response.status(status.OK).send(data);
  });

  //[GET] /user/:id
  getAUser = wrapError(async (req, res) => {
    const _id = req.params.id;
    const user = await UserModel.findById(_id).select(["-__v", "-password"]);
    if (!user) {
      return next(new ApiError(status.NOT_FOUND), "User not found!");
    }
    const data = buildResponse(user);
    response.status(status.OK).send(data);
  });

  //[PUT] /user/:id

  update = wrapError(async (req, res) => {
    const result = await UserModel.findByIdAndUpdate(
      { _id: _id },
      { $set: formData },
      { runValidators: true, context: "query" }
    );
    if (!result) {
      return next(
        new ApiError(status.NOT_FOUND, "Can not find object to update!!!")
      );
    }
    const data = buildResponse(result);
    response.status(status.OK).send(data);
  });

  //[DELETE] /user/:id
  delete = wrapError(async (req, res) => {
    const _id = req.params.id;
    const result = await UserModel.deleteOne({ _id: _id });
    if (!result.deletedCount) {
      return next(new ApiError(status.NOT_FOUND), "User not found!");
    }
    const data = buildResponse(result);
    response.status(status.OK).send(data);
  });
}

module.exports = new UserController();
