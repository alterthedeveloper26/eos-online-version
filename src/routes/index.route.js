const subjectRouter = require("./subject.route");

const route = (app) => {
  app.use("/subject", subjectRouter);
};

module.exports = route;
