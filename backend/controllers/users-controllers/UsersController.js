const CarRentCompany = require("../../models/car-rental-model/companyModel");
const Hotel = require("../../models/hotel-model/hotelModel");
const Users = require("../../models/users-model/usersModel");
const asyncHandler = require("../../utils/asyncHandler");
const { createError } = require("../../utils/error");

//create user
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw createError(400, "Please provide email and password");
  }

  const emailfound = await Users.findOne({
    email: email,
  });

  if (emailfound) {
    throw createError(400, "Email already exist");
  }

  const createUser = await Users.create(req.body);

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
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw createError(400, "Please provide email and password");
  }

  const user = await Users.findOne({
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
    data: { user: userWithoutPassword, token },
  });
});

//Get All Users
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await Users.find()
    .populate({ path: "marchentid", select: "hotelName _id" })
    .select("-password ");

  if (!users) {
    throw createError(400, "Users Not Found");
  }

  res.status(200).json({
    success: true,
    message: "All Users",
    data: users,
  });
});

//Get All Hotel Name Controller
exports.getAllUsersCompanyName = asyncHandler(async (req, res, next) => {
  const findHotel = await Hotel.find().select("hotelName _id");
  const findCarRental = await CarRentCompany.find().select("companyName _id");

  if (!findHotel || !findCarRental) {
    throw createError(400, "find Hotel or Car Rental Company Failed");
  }

  res.status(200).json({
    success: true,
    message: "Find All Hotel Name Successfully",
    data: [...findHotel, ...findCarRental],
  });
});
