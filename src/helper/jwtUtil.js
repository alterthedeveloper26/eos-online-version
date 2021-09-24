const JWT = require("jsonwebtoken");
const { TOKEN } = require("../constant/token");

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

module.exports = { encodedToken };
