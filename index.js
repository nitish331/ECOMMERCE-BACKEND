const app = require("./app");
const express = require("express");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");

// handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log("error", err.message);
  console.log("uncaught exception error handled");
  process.exit(1);
});
// conguration
dotenv.config({ path: "backend/config/config.env" });

// connecting database
const connectDatabase = require("./config/mongoose");
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log("server is up and running");
});

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log("error", err.stack);
  console.log("shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
