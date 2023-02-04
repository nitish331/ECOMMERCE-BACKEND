const express = require("express");
const {
  registerUser,
  loginUser,
  logOut,
  fongotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllusers,
  getSingleUserDetails,
  updateRole,
  DeleteUser,
} = require("../Controller/userController");
const { isAuthenticated, authorizedRoles } = require("../middlewares/auth");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logOut", logOut);

router.post("/password/forgot", fongotPassword);

router.put("/password/reset/:token", resetPassword);

router.get("/me", isAuthenticated, getUserDetails);

router.put("/password/update", isAuthenticated, updatePassword);

router.put("/me/update", isAuthenticated, updateProfile);

router.get(
  "/admin/users",
  isAuthenticated,
  authorizedRoles("admin"),
  getAllusers
);

router.get(
  "/admin/user/:id",
  isAuthenticated,
  authorizedRoles("admin"),
  getSingleUserDetails
);

router.put(
  "/admin/user/:id",
  isAuthenticated,
  authorizedRoles("admin"),
  updateRole
);

router.delete(
  "/admin/user/:id",
  isAuthenticated,
  authorizedRoles("admin"),
  DeleteUser
);

module.exports = router;
