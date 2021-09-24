const Joi = require("joi");

const signUpSchema = Joi.object({
  name: Joi.string()
    .regex(/^[A-Za-z ]{0,}$/)
    .min(3)
    .max(30)
    .required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),

  repeat_password: Joi.ref("password"),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),

  isAdmin: Joi.boolean(),
}).with("password", "repeat_password");

const updateSchema = Joi.object({
  name: Joi.string()
    .regex(/^[A-Za-z ]{0,}$/)
    .min(3)
    .max(30),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  repeat_password: Joi.ref("password"),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),

  isAdmin: Joi.boolean(),
});

const loginSchema = Joi.object({
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),

  access_token: [Joi.string(), Joi.number()],

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
}).xor("password", "access_token");

const validIdSchema = Joi.object({
  param: Joi.string()
    .regex(/^[0-9a-zA-Z]{24}$/)
    .required(),
});

const validateParam = (schema, name) => {
  return (req, res, next) => {
    const param = req.params[name];

    const result = schema.validate({
      param,
    });

    if (result.error) {
      return res.status(400).json({ message: "Id is not in right format!!!" });
    } else {
      next();
    }
  };
};

const validateForm = (schema) => {
  return (req, res, next) => {
    const formData = { ...req.body };
    const result = schema.validate(formData);

    if (result.error) {
      return res.status(400).json({
        message: `${result.error.details[0].path} fail validation!!!`,
      });
    } else {
      next();
    }
  };
};

module.exports = {
  validateForm,
  validateParam,
  loginSchema,
  signUpSchema,
  validIdSchema,
  updateSchema,
};
