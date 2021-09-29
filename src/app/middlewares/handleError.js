const logger = require("../../helper/logger");

const notfoundHandler = (req, res, next) => {
  const err = new Error("Link Not Found!");
  err.status = 400;
  next(err);
};

const errorHandler = (err, req, res, next) => {
  const errCode = err.status || 500;
  return res.status(errCode).json({
    error: {
      code: errCode,
      message: err.message,
    },
  });
};

module.exports = { notfoundHandler, errorHandler };
