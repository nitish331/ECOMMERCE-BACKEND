const ErrorHandler = require("../utils/errorHandler");
const asyncErrors = require("./asyncErrors");
const Jwt = require("jsonwebtoken");
const User = require("../models/user");
exports.isAuthenticated = asyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please Login To access this resource", 401));
  }

  const decodedData = Jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
});

exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role ${req.user.role} is not allowed to acces this resource`,
          403
        )
      );
    }
    next();
  };
};
