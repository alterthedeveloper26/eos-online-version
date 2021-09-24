const express = require("express");
const router = express.Router();
const AuthController = require("../app/controllers/AuthController");
const passport = require("../app/middlewares/passport.middleware");

const {
  validateForm,
  loginSchema,
  signUpSchema,
  validIdSchema,
  updateSchema,
} = require("../app/middlewares/req-validator.middleware");

router.post("/login", AuthController.login);
router.post("/register", validateForm(signUpSchema), AuthController.signup);
router.get(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  AuthController.secret
);

module.exports = router;
