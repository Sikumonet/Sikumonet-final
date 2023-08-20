const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const roleBaseAuthMiddleware = (allowedRoles) =>
  asyncHandler(async (req, res, next) => {
    let userRole;
    try {
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
        const decodedJwt = jwt.decode(token, { complete: true });
        if (!decodedJwt) {
          res.status(401).json({ message: "Not a valid JWT token" });
          throw new Error("Not a valid JWT token");
        }
        userRole = decodedJwt.payload.role;
      }

      if (allowedRoles.includes(userRole)) {
        next();
      } else {
        res.status(403).json({
          message: "You don't have the necessary role to access this resource.",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

module.exports = {
  roleBaseAuthMiddleware,
};
