const logger = require("./logger");

const wrapError = (func) => async (req, res, next) => {
  try {
    await func(req, res, next);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

module.exports = wrapError;
