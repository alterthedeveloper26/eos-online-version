const express = require("express");
const router = express.Router();
const {
  checkValidRefreshToken,
} = require("../app/middlewares/authorization.middleware");
const AuthController = require("../app/controllers/AuthController");
const passport = require("../app/middlewares/passport.middleware");

const {
  validateForm,
  loginSchema,
  signUpSchema,
  validIdSchema,
  updateSchema,
} = require("../app/middlewares/req-validator.middleware");

router.post(
  "/login",
  validateForm(loginSchema),
  passport.authenticate("local", { session: false }),
  AuthController.login
);

router.post("/register", validateForm(signUpSchema), AuthController.signup);

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
