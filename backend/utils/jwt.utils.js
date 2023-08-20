const jwt = require("jsonwebtoken");

//Generate JWT token
const generateJwtToken = (tokenData) => {
  return jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 * 7,
  });
};

module.exports = {
  generateJwtToken,
};
