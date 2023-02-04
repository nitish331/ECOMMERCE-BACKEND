const express = require("express");
const {
  newOrder,
  getSingleOrder,
  getUserOrder,
  getAllUserOrder,
  updateOrderStatus,
  deleteOrder,
} = require("../Controller/orderController");
const router = express.Router();
const { isAuthenticated, authorizedRoles } = require("../middlewares/auth");

router.post("/order/create", isAuthenticated, newOrder);

router.get("/order/:id", isAuthenticated, getSingleOrder);

router.get("/myorders", isAuthenticated, getUserOrder);

router.get(
  "/admin/orders",
  isAuthenticated,
  authorizedRoles("admin"),
  getAllUserOrder
);

router.put(
  "/admin/order/:id",
  isAuthenticated,
  authorizedRoles("admin"),
  updateOrderStatus
);

router.delete(
  "/admin/order/:id",
  isAuthenticated,
  authorizedRoles("admin"),
  deleteOrder
);

module.exports = router;
