const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/eos_online_version", {
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
