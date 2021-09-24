const UserModel = require("../models/User");
const jwtUtil = require("../../helper/jwtUtil");

class AuthController {
  //[POST] /auth/register
  async signup(req, res, next) {
    const formData = { ...req.body };
    const newUser = new UserModel(formData);
    try {
      await newUser.save();

      const token = jwtUtil.encodedToken(newUser._id);

      res.setHeader("Authorization", token);
      return res.status(201).json({
        message: "Created successfully!!",
      });
    } catch (err) {
      next(err);
    }
  }

  //[POST] /auth/login
  login(req, res, next) {
    console.log("login");
  }

  //[GET] /auth/secret
  secret(req, res, next) {
    console.log("DIT ME LOI O DAY AY NHI?");
    return res.send({ message: "nothing" });
  }
}

module.exports = new AuthController();
