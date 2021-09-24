const UserModel = require("../models/User");

class UserController {
  //[GET] /user
  async getAll(req, res, next) {
    try {
      const _id = req.params.id;
      const result = await UserModel.find().select(["-__v", "-password"]);

      if (!result) {
        throw new Error("No user has been found!!!");
      }

      return res.status(400).json({
        message: "Query successfully!!!",
        payload: result,
      });
    } catch (err) {
      next(err);
    }
  }

  //[GET] /user/:id
  async getAUser(req, res, next) {
    try {
      const _id = req.params.id;
      const user = await UserModel.findById(_id).select(["-__v", "-password"]);

      if (!user) {
        throw new Error("User not found");
      }

      return res.status(400).json({
        message: "Querry successfully!!!",
        payload: user,
      });
    } catch (err) {
      next(err);
    }
  }

  //[PUT] /user/:id
  async update(req, res, next) {
    const _id = req.params.id;
    const formData = { ...req.body };

    try {
      const result = await UserModel.findByIdAndUpdate(
        { _id: _id },
        { $set: formData },
        { runValidators: true, context: "query" }
      );

      console.log(formData);

      if (!result) {
        throw new Error("Can not find object to update!!!");
      } else {
        console.log(result);
      }

      return res.status(200).json({ message: "update successfully!" });
    } catch (err) {
      next(err);
    }
  }

  //[DELETE] /user/:id
  async delete(req, res, next) {
    const _id = req.params.id;

    try {
      const result = await UserModel.deleteOne({ _id: _id });

      if (!result.deletedCount) {
        throw new Error("delete none!!!");
      }

      return res.status(200).json({ message: "delete successfully!" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
