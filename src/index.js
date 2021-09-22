var express = require("express");
var app = express();

const port = 3000;

const route = require("./routes/index.route");

const db = require("./config/db/index");
db.connect();

// respond with "hello world" when a GET request is made to the homepage
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
