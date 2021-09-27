const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/UserController");
const {
  authorizeAdminOnly,
} = require("../app/middlewares/authorization.middleware");
const {
  validateForm,
  validateParam,
  loginSchema,
  signUpSchema,
  validIdSchema,
  updateSchema,
} = require("../app/middlewares/req-validator.middleware");

router
  .route("/:id")
  .get(
    authorizeAdminOnly(),
    validateParam(validIdSchema, "id"),
    userController.getAUser
  )
  .put(
    validateParam(validIdSchema, "id"),
    validateForm(updateSchema),
    userController.update
  )
  .delete(
    authorizeAdminOnly(),
    validateParam(validIdSchema, "id"),
    userController.delete
  );

router.get("/", authorizeAdminOnly(), userController.getAll);

module.exports = router;
