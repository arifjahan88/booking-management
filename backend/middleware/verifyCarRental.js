const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const { createError } = require("../utils/error");
const Users = require("../models/users-model/usersModel");

const verifyCarRental = asyncHandler(async (req, res, next) => {
  try {
    //Get token from header
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw createError(401, "You are not Authenticate!");
    }

    //Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userinfo = await Users.findById(decoded._id).select("-password");

    if (!userinfo) {
      throw createError(404, "Invalid Access Token!");
    }

    //Set user info to req.user
    req.user = userinfo;

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = verifyCarRental;
