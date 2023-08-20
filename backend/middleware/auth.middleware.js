const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Validating the token
      token = req.headers.authorization.split(" ")[1];
      const decodedJwt = jwt.decode(token, { complete: true });
      if (!decodedJwt) {
        res.status(401).json({ message: "Not a valid JWT token" });
        throw new Error("Not a valid JWT token");
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Not authorized" });
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not Authorized & No Token..!!" });
    throw new Error("Not Authorized & No Token..!!");
  }
});

module.exports = {
  authMiddleware,
};
