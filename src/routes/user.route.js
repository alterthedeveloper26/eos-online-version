const express = require("express");
const router = express.Router();
const passport = require("../app/middlewares/passport");
const userController = require("../app/controllers/user.controller");
const { authorizeAdminOnly } = require("../app/middlewares/authorize");
const validate = require("../app/middlewares/validate");
const { RD, update } = require("../app/validations/user.validation");

router
  .route("/:id")
  .get(authorizeAdminOnly(), validate(RD), userController.getAUser)
  .put(
    passport.authenticate("jwt", { session: false }),
    validate(update),
    userController.update
  )
  .delete(authorizeAdminOnly(), validate(RD), userController.delete);

router.get("/", authorizeAdminOnly(), userController.getAll);

module.exports = router;
