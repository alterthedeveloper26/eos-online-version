const express = require("express");
const path = require("path"); //For __dirname
const morgan = require("morgan"); //For logger
const logger = require("./helper/logger");
const multer = require("multer"); //For form parser
const passport = require("passport");
// const bodyParser = require("body-parser");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const forms = multer();
const app = express();

const route = require("./routes/index.route");

const {
  errorHandler,
  notfoundHandler,
} = require("./app/middlewares/handleError");

//Connect db
const db = require("./config/mongo");
db.connect();

//Middleware
// app.use(bodyParser.json());

app.use(express.json());
app.use(forms.array());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(morgan("tiny", { stream: logger.stream }));

//Route
route(app);

//Catch error and handler
app.use(notfoundHandler);
app.use(errorHandler);

const port = process.env.PORT || 3000;
//Start the server
app.listen(port, () => {
  logger.info(`App listening at http://localhost:${port}`);
});
