const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const dotenv = require("dotenv");

// conguration
dotenv.config({ path: "backend/config/config.env" });

const errorMiddleware = require("./middlewares/error");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());

// Routes import
const productRoute = require("./Routes/productRoutes");
const userRoutes = require("./Routes/userRoutes");
const orderRoutes = require("./Routes/orderRoute");
const paymentRoutes = require("./Routes/paymentRoute");

app.use("/", orderRoutes);
app.use("/", productRoute);
app.use("/", userRoutes);
app.use("/", paymentRoutes);

// middleware for error
app.use(errorMiddleware);

module.exports = app;
