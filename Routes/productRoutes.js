const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProducts,
  deleteProduct,
  getProductDetails,
  createReview,
  getAllReviewsOfAProduct,
  deleteReview,
  getAdminProducts,
} = require("../Controller/productController");
const { isAuthenticated, authorizedRoles } = require("../middlewares/auth");
const router = express.Router();

router.get("/products", getAllProducts);

router.get(
  "/admin/products",
  isAuthenticated,
  authorizedRoles("admin"),
  getAdminProducts
);

router.post(
  "/admin/product/new",
  isAuthenticated,
  authorizedRoles("admin"),
  createProduct
);

router.put(
  "/admin/product/:id",
  isAuthenticated,
  authorizedRoles("admin"),
  updateProducts
);

router.delete(
  "/admin/product/:id",
  isAuthenticated,
  authorizedRoles("admin"),
  deleteProduct
);

router.get("/product/:id", getProductDetails);

router.put("/review", isAuthenticated, createReview);

router.get("/reviews", getAllReviewsOfAProduct);

router.delete("/reviews", isAuthenticated, deleteReview);

module.exports = router;
