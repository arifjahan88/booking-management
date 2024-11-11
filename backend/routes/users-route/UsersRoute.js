const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getAllUsersCompanyName,
} = require("../../controllers/users-controllers/UsersController");
const {
  registerSuperUser,
  loginSuperUser,
} = require("../../controllers/users-controllers/superAdminController");

const router = express.Router();

router.post("/register-user", registerUser);
router.post("/login-user", loginUser);
router.get("/get-users", getAllUsers);
router.get("/get-allusers-company", getAllUsersCompanyName);

//Super User Route
router.post("/register-superuser", registerSuperUser);
router.post("/login-superuser", loginSuperUser);

module.exports = router;
