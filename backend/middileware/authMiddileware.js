const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password")
      if (!user) {
        res.status(401);
        throw new Error("user not found");
      }
      req.user = user;

    next()
    } catch (error) {
      res.status(401);
      throw new Error(error.message);
    }
  } else {
    res.status(401);
    throw new Error("you are unauthorized");
  }


});

module.exports = { protect };
