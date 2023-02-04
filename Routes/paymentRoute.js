const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../Controller/paymentController");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.post("/payment/process", isAuthenticated, processPayment);

router.get("/stripeapikey", isAuthenticated, sendStripeApiKey);

module.exports = router;
