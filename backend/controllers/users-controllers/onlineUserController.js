const OnlineUser = require("../../models/users-model/onlineUsersModel");
const asyncHandler = require("../../utils/asyncHandler");
const { createError } = require("../../utils/error");

//create user
exports.onlineregisterUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw createError(400, "Please provide email and password");
  }

  const emailfound = await OnlineUser.findOne({
    email: email,
  });

  if (emailfound) {
    throw createError(400, "Email already exist");
  }

  const createUser = await OnlineUser.create(req.body);

  if (!createUser) {
    throw createError(400, "Create User Failed");
  }

  res.status(200).json({
    success: true,
    message: "Create User Successfully",
    data: createUser,
  });
});

//login user
exports.onlineloginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw createError(400, "Please provide email and password");
  }

  const user = await OnlineUser.findOne({
    email: email,
  });

  if (!user) {
    throw createError(400, "User Not Found");
  }

  const isPasswordMatch = await user.isPasswordCorrect(password);

  if (!isPasswordMatch) {
    throw createError(400, "Password Not Correct!");
  }

  const token = user.createToken();
  const userWithoutPassword = { ...user._doc, password: undefined };

  res.status(200).json({
    success: true,
    message: "Login Successfully",
    data: userWithoutPassword,
    token,
  });
});

//get user All Bookings
exports.getOnlineUserAllBookings = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw createError(400, "User Not Found");
  }

  const user = await OnlineUser.findById(req.user._id)
    .populate({
      path: "hotelBooking",
      select: "-__v -createdAt -updatedAt",
    })
    .select("-password -createdAt -updatedAt -__v");

  if (!user) {
    throw createError(400, "User Not Found");
  }

  res.status(200).json({
    success: true,
    message: "Find User Bookings Successfully",
    data: user,
  });
});
