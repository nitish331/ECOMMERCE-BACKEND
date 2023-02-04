require("dotenv").config({ path: "config/config.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const ErrorHandler = require("../utils/errorHandler");
const asyncError = require("../middlewares/asyncErrors");

exports.processPayment = asyncError(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "ECOMMERCE",
    },
  });

  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

exports.sendStripeApiKey = asyncError(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
