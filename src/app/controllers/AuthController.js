const UserModel = require("../models/User");
const RefreshTokenModel = require("../models/RefreshToken");
const jwtUtil = require("../../helper/jwtUtil");
const OTPModel = require("../models/OTP");
const { VERIFICATION_FIELD } = require("../../constant/sendEmail");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const sendGridUtil = require("../../helper/sendGridUtil");
const encryptUtil = require("../../helper/encryptUtil");
const uuid = require("uuid").v4;

class AuthController {
  //[POST] /auth/register
  async signup(req, res, next) {
    const formData = { ...req.body };
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(formData.password, salt);
    formData.password = hashedPassword;

    const newUser = new UserModel(formData);
    try {
      await newUser.save();

      const token = jwtUtil.encodedToken(newUser._id);
      const refreshToken = jwtUtil.encodedRefreshToken(newUser._id);

      const refreshTokenObj = new RefreshTokenModel({
        user: newUser._id,
        token: refreshToken,
      });

      refreshTokenObj.save();

      res.setHeader("Authorization", token);
      res.setHeader("RefreshToken", refreshToken);

      return res.status(201).json({
        message: "Created successfully!!",
      });
    } catch (err) {
      next(err);
    }
  }

  //[POST] /auth/login
  login(req, res, next) {
    if (req.headers["authorization"]) {
      return res.status(200).json({
        message: "FUCK OFF!! You already have one!",
      });
    }

    const token = jwtUtil.encodedToken(req.user._id);

    res.setHeader("Authorization", token);
    return res.status(200).json({
      message: "Login successfully!!",
    });
  }

  //[GET] /auth/secret
  secret(req, res, next) {
    return res.send(req.user);
  }

  //[POST] /auth/refresh-tokens
  async refreshToken(req, res, next) {
    try {
      const { user } = req;
      const token = jwtUtil.encodedToken(user);
      res.setHeader("Authorization", token);

      return res.status(201).json({
        message: "Refresh successfully!!",
      });
    } catch (err) {
      next(err);
    }
  }

  //[POST] auth/request-verification
  async requestVerification(req, res, next) {
    try {
      const { email } = req.user;

      if (user.isEmailVerified)
        throw new Error("Your account has already been verified!!!");

      const code = uuid();

      const otp = new OTPModel({
        email,
        code,
      });

      await otp.save();

      await sendGridUtil.sendVerificationEmail(email, code);

      res.status(200).send({
        message: "Please check your email and proceed to confirmation!!!",
      });
    } catch (err) {
      console.log("[AuthController]: ", err);
      next(err);
    }
  }

  //[POST] auth/verify-email
  async verifyEmail(req, res, next) {
    try {
      const { code } = req.params;
      const otp = await OTPModel.findOne({ code });

      if (!otp) throw new Error("Code does not exist!!!");

      const user = await UserModel.findOneAndUpdate(
        { email: otp.email },
        { isEmailVerified: true },
        { new: true }
      );

      await OTPModel.findOneAndDelete({ code });

      return res.status(200).json({
        message: "Your email has been verified!!!",
      });
    } catch (err) {
      next(err);
    }
  }

  //[POST] auth/request-reset-password => End point doc chan luon :<
  async requestResetPassword(req, res, next) {
    try {
      const { email } = req.body;

      const user = await UserModel.findOne({ email });
      if (!user) throw new Error("This gmail hasn't been registered!!!");

      const code = uuid();

      const otp = new OTPModel({
        email,
        code,
      });

      await otp.save();

      await sendGridUtil.sendResetPasswordEmail(email, code);

      res.status(200).send({
        message: "Please check your email and proceed to confirmation!!!",
      });
    } catch (err) {
      console.log("[AuthController]: ", err);
      next(err);
    }
  }

  //[POST] auth/reset-password
  async resetPassword(req, res, next) {
    try {
      const { code } = req.params;
      const { password } = req.body;
      const otp = await OTPModel.findOne({ code });

      if (!otp) throw new Error("Code does not exist!!!");

      const user = await UserModel.findOneAndUpdate(
        { email: otp.email },
        { password: await encryptUtil.encryptPassword(password) }
      );

      await OTPModel.findOneAndDelete({ code });

      return res.status(200).json({
        message: "Your password has been changed!!!",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
