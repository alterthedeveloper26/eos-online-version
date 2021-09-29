const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");
const pick = require("../helper/pick");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const option = {
  NODE_ENV: Joi.string().valid("production", "development", "test").required(),
  PORT: Joi.number().default(3000),
  BASE_URL: Joi.string().required(),
  MONGODB_URL: Joi.string().required().description("Mongo DB url"),
  JWT_SECRET: Joi.string().required().description("JWT secret key"),
  JWT_REFRESH_SECRET: Joi.string().required(),
  TOKEN_EXPIRED: Joi.string().alphanum().required(),
  REFRESH_TOKEN_EXPIRED: Joi.string().alphanum().required(),
  SENDGRID_API_KEY: Joi.string().required(),
};

const envVarsSchema = Joi.object().keys({ option });

const env = pick(process.env, Object.keys(option));
const { value: envVars, error } = envVarsSchema.validate(env, {
  errors: { label: "key" },
  allowUnknown: true,
});

if (error) {
  console.log(error);
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  url: envVars.BASE_URL,
  mongoose: {
    url: envVars.MONGODB_URL,
  },
  grid: {
    apiKey: envVars.SENDGRID_API_KEY,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    refreshSecret: envVars.JWT_REFRESH_SECRET,
    expire: envVars.TOKEN_EXPIRED,
    refreshExpire: envVars.JWT_REFRESH_SECRET,
  },
};
