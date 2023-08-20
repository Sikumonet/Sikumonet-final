const bcrypt = require("bcryptjs");

// Hashing a new password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// Comparing new password & current password
const comparePassword = async (passwordFromReqBody, passwordFromDb) => {
  return await bcrypt.compare(passwordFromReqBody, passwordFromDb);
};

module.exports = {
  hashPassword,
  comparePassword,
};
