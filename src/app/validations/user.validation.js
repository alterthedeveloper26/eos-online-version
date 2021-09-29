const Joi = require("joi");
const { objectId, name, password } = require("./custom.validation");

const update = {
  body: Joi.object().keys({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),

    password: Joi.string().required().custom(password),
    repeat_password: Joi.ref("password"),
    name: Joi.string().required().custom(name),
    isAdmin: Joi.boolean(),
  }),
};

const RD = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  RD,
  update,
};
