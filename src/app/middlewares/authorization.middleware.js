const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const RefreshTokenModel = require("../models/RefreshToken");
const { JWT_SECRET, JWT_REFRESH_SECRET } = require("../../constant/token");
const _ = require("lodash");

const checkValidRefreshToken = () => {
  return (req, res, next) => {
    // Find JWT in Headers
    const token = req.headers["refresh-token"];
    if (!token) {
      return res.status(401).send("Sorry pal: access denied");
    } else {
      // Validate JWT
      // Bearer yndujsoIn...
      const tokenBody = token.slice(7);

      jwt.verify(tokenBody, JWT_REFRESH_SECRET, (err, decoded) => {
        if (err) {
          console.log(`JWT Error: ${err}`);
          return res.status(401).send("Error: Access Denied");
        }
        // No Error, JWT is good!

        // Check for credentials
        console.log(decoded.sub);
        RefreshTokenModel.findOne({ user: decoded.sub })
          .then((refreshToken) => {
            if (_.isEqual(refreshToken.token, tokenBody.trim())) {
              req.user = decoded.sub;
              return next();
            }
          })
          .catch((next, err) => next(err));
      });
    }
  };
};

const authorizeAdminOnly = () => {
  return (req, res, next) => {
    // Find JWT in Headers
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).send("Sorry pal: access denied");
    } else {
      // Validate JWT
      // Bearer yndujsoIn...
      const tokenBody = token.slice(7);

      jwt.verify(tokenBody, JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log(`JWT Error: ${err}`);
          return res.status(401).send("Error: Access Denied");
        }
        // No Error, JWT is good!

        // Check for credentials
        // const user = UserModel.findById(decoded)
        UserModel.findById(decoded.sub).then((user) => {
          if (user.isAdmin) return next();

          return res.status(401).send("Error: You do not have permission!!!");
        });
      });
    }
  };
};

module.exports = { authorizeAdminOnly, checkValidRefreshToken };
