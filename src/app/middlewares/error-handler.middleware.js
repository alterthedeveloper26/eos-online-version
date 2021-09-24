const notfoundHandler = (req, res, next) => {
  const err = new Error("Link Not Found!");
  err.status = 400;
  next(err);
};

const errorHandler = (err, req, res, next) => {
  const errCode = err.status || 500;
  return res.status(errCode).json({
    error: {
      message: err.message,
    },
  });
};

const wrapError = (func) => async (req, res, next) => {
  try {
    await func(req, res, next);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { notfoundHandler, errorHandler, wrapError };
