const mongoose = require("mongoose");
require("dotenv").config({ path: "config/config.env" });

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log("mongo db connected with server data");
    });
};

module.exports = connectDatabase;
