const mongoose = require("mongoose");
const config = require("./config");
async function connect() {
  try {
    await mongoose.connect(config.mongoose.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useFindAndModify: false,
    });
    console.log("Connected!!!");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connect };
