const express = require("express");
const router = express.Router();
const { checkValidRefreshToken } = require("../app/middlewares/authorize");
const AuthController = require("../app/controllers/auth.controller");

const passport = require("../app/middlewares/passport");
const validate = require("../app/middlewares/validate");

const { login, register } = require("../app/validations/auth.validation");

router.post(
  "/login",
  validate(login),
  passport.authenticate("local", { session: false }),
  AuthController.login
);

router.post("/register", validate(register), AuthController.signup);

router.post(
  "/refresh-token",
  checkValidRefreshToken(),
  AuthController.refreshToken
);

router.post(
  "/request-verification",
  passport.authenticate("jwt", { session: false }),
  AuthController.requestVerification
);
router.post("/verify-email/:code", AuthController.verifyEmail);

router.post("/request-reset-password", AuthController.requestResetPassword);
router.post("/reset-password/:code", AuthController.resetPassword);

module.exports = router;
