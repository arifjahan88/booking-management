const SuperUser = require("../../models/users-model/superUser");
const asyncHandler = require("../../utils/asyncHandler");
const { createError } = require("../../utils/error");

//create user
exports.registerSuperUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw createError(400, "Please provide email and password");
  }

  const emailfound = await SuperUser.findOne({
    email: email,
  });

  if (emailfound) {
    throw createError(400, "Email already exist");
  }

  const createUser = await SuperUser.create(req.body);

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
exports.loginSuperUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw createError(400, "Please provide email and password");
  }

  const user = await SuperUser.findOne({
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
