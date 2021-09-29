const Joi = require("joi");
const { password, name } = require("./custom.validation");

const register = {
  body: Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().required().custom(password),
    repeat_password: Joi.ref("password"),
    name: Joi.string().required().custom(name),
    isAdmin: Joi.boolean(),
  }),
};

const login = {
  body: Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().custom(password).required(),
  }),
};

const logout = {
  body: Joi.object({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object({
    token: Joi.string().required(),
  }),
  body: Joi.object({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
