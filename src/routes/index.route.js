const subjectRouter = require("./subject.route");
const userRouter = require("./user.route");
const authRouter = require("./auth.route");

const route = (app) => {
  app.use("/subject", subjectRouter);
  app.use("/user", userRouter);
  app.use("/auth", authRouter);
};

module.exports = route;
