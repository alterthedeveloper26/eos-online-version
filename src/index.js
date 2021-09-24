const express = require("express");
const path = require("path");
const logger = require("morgan");
const multer = require("multer");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const forms = multer();
const app = express();

const route = require("./routes/index.route");

const {
  errorHandler,
  notfoundHandler,
} = require("./app/middlewares/error-handler.middleware");

//Connect db
const db = require("./config/db/index");
db.connect();

//Middleware
app.use(express.json());
app.use(forms.array());
app.use(express.urlencoded({ extended: true }));

app.use(logger("dev"));

//Route
route(app);

//Catch error and handler
app.use(notfoundHandler);
// app.use(errorHandler);

// const port = process.env.PORT || 3000;
const port = 3000;
//Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
