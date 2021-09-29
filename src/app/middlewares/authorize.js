const UserModel = require("../models/User");
const RefreshTokenModel = require("../models/RefreshToken");
const { JWT_SECRET, JWT_REFRESH_SECRET } = require("../../constant/token");
const ApiError = require("../../helper/apiError");

const jwt = require("jsonwebtoken");
const _ = require("lodash");
const status = require("http-status");

const checkValidRefreshToken = () => {
  return async (req, res, next) => {
    // Find JWT in Headers
    const token = req.headers["refresh-token"];
    if (!token) {
      return next(new ApiError(status.UNAUTHORIZED, "You haven't logged in!"));
    } else {
      // Validate JWT
      // Slice Bearer
      const tokenBody = token.slice(7);

      try {
        const decoded = await jwt.verify(tokenBody, JWT_REFRESH_SECRET);
        // No Error, JWT is good!
        // Check for credentials
        const refreshToken = await RefreshTokenModel.findOne({
          user: decoded.sub,
        });

        if (_.isEqual(refreshToken.token, tokenBody.trim())) {
          req._id = decoded.sub;
          return next();
        }
      } catch (err) {
        return next(new ApiError(err.status, err.message));
      }
    }
  };
};

const authorizeAdminOnly = () => {
  return async (req, res, next) => {
    // Find JWT in Headers
    const token = req.headers["authorization"];
    if (!token) {
      return next(new ApiError(status.UNAUTHORIZED, "You haven't logged in!"));
    } else {
      // Validate JWT
      // Bearer yndujsoIn...
      const tokenBody = token.slice(7);

      try {
        const decoded = jwt.verify(tokenBody, JWT_SECRET);
        // No Error, JWT is good!
        // Check for credentials
        const user = await UserModel.findById(decoded.sub);
        if (user.isAdmin) return next();
        return next(
          new ApiError(status.UNAUTHORIZED, "You do not have permission!")
        );
      } catch (err) {
        return next(new ApiError(err.status, err.message));
      }
    }
  };
};

module.exports = { authorizeAdminOnly, checkValidRefreshToken };
