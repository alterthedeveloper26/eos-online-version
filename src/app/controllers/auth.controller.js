const UserModel = require("../models/User");
const RefreshTokenModel = require("../models/RefreshToken");
const OTPModel = require("../models/OTP");

const jwt = require("../services/token.service");
const sendGrid = require("../services/email.service");
const encrypt = require("../../helper/encryption");
const buildResponse = require("../../helper/responseBuilder");
const wrapError = require("../../helper/errorWrapper");
const ApiError = require("../../helper/apiError");

const status = require("http-status");
const uuid = require("uuid").v4;

class AuthController {
  //[POST] /auth/register
  signup = wrapError(async (req, res) => {
    const formData = { ...req.body };
    formData.password = await encrypt(formData.password);
    formData.name = formData.name.replace(/\s\s+/g, " ").trim();

    const newUser = new UserModel(formData);
    await newUser.save();

    const token = jwt.encodedToken(newUser._id);
    const refreshToken = jwt.encodedRefreshToken(newUser._id);

    const refreshTokenObj = new RefreshTokenModel({
      user: newUser._id,
      token: refreshToken,
    });
    refreshTokenObj.save();

    res.setHeader("Authorization", token);
    res.setHeader("RefreshToken", refreshToken);

    const data = buildResponse();
    return res.status(status.CREATED).send(data);
  });

  //[POST] /auth/login
  login = wrapError(async (req, res) => {
    if (req.headers["authorization"]) {
      return new ApiError(status.BAD_REQUEST, "Already login!");
    }
    const token = jwt.encodedToken(req.user._id);
    const data = buildResponse({ token });
    res.setHeader("Authorization", token);
    return res.status(status.OK).send(data);
  });

  //[POST] /auth/refresh-tokens
  refreshToken = wrapError(async (req, res) => {
    const { _id } = req;
    const token = jwt.encodedToken(_id);
    res.setHeader("Authorization", token);
    const data = buildResponse({ token });
    return res.status(status.OK).send(data);
  });

  //[POST] auth/request-verification
  requestVerification = wrapError(async (req, res) => {
    const { email } = req.user;
    if (user.isEmailVerified)
      throw new Error("Your account has already been verified!!!");

    const code = uuid();
    const otp = new OTPModel({
      email,
      code,
    });
    await otp.save();

    await sendGrid.sendVerificationEmail(email, code);

    const data = buildResponse();
    return res.status(status.OK).send(data);
  });

  //[POST] auth/verify-email
  verifyEmail = wrapError(async (req, res) => {
    const { code } = req.params;
    const otp = await OTPModel.findOne({ code });
    if (!otp) throw new Error("Code does not exist!!!");

    const user = await UserModel.findOneAndUpdate(
      { email: otp.email },
      { isEmailVerified: true },
      { new: true }
    );
    await OTPModel.findOneAndDelete({ code });

    const data = buildResponse();
    return res.status(status.OK).send(data);
  });

  //[POST] auth/request-reset-password => End point doc chan luon :<
  requestResetPassword = wrapError(async (req, res) => {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("This gmail hasn't been registered!!!");

    const code = uuid();
    const otp = new OTPModel({
      email,
      code,
    });
    await otp.save();
    await sendGrid.sendResetPasswordEmail(email, code);

    const data = buildResponse();
    return res.status(status.OK).send(data);
  });

  //[POST] auth/reset-password
  resetPassword = wrapError(async (req, res) => {
    const { code } = req.params;
    const { password } = req.body;
    const otp = await OTPModel.findOne({ code });
    if (!otp) throw new Error("Code does not exist!!!");

    const user = await UserModel.findOneAndUpdate(
      { email: otp.email },
      { password: await encrypt.encryptPassword(password) }
    );

    await OTPModel.findOneAndDelete({ code });

    const data = buildResponse();
    return res.status(status.OK).send(data);
  });
}

module.exports = new AuthController();
