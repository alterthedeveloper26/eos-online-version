const JWT = require("jsonwebtoken");
const { TOKEN, JWT_SECRET, JWT_REFRESH_SECRET } = require("../constant/token");

const encodedToken = (userId) => {
  return JWT.sign(
    {
      iss: "Alter the developer", //Person who produce
      sub: userId,
      iat: new Date().getTime(),
    },
    JWT_SECRET,
    { expiresIn: TOKEN.TOKEN_EXPIRED }
  );
};

const encodedRefreshToken = (userId) => {
  return JWT.sign(
    {
      iss: "Alter the developer", //Person who produce
      sub: userId,
      iat: new Date().getTime(),
    },
    JWT_REFRESH_SECRET,
    { expiresIn: TOKEN.REFRESH_TOKEN_EXPIRED }
  );
};

module.exports = { encodedToken, encodedRefreshToken };
