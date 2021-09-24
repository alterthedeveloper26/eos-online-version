const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/UserController");
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
  .get(validateParam(validIdSchema, "id"), userController.getAUser)
  .put(
    validateParam(validIdSchema, "id"),
    validateForm(updateSchema),
    userController.update
  )
  .delete(validateParam(validIdSchema, "id"), userController.delete);

router.get("/", userController.getAll);

module.exports = router;
