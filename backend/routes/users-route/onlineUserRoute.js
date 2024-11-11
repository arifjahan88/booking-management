const express = require("express");
const {
  onlineregisterUser,
  onlineloginUser,
  getOnlineUserAllBookings,
} = require("../../controllers/users-controllers/onlineUserController");
const verifyToken = require("../../middleware/verifyToken");
const {
  setReviewbyBookingId,
} = require("../../controllers/online-booking-controllers/onlineBookingController");

const router = express.Router();

router.post("/onlineregister-user", onlineregisterUser);
router.post("/onlinelogin-user", onlineloginUser);
router.get("/get-online-bookings", verifyToken, getOnlineUserAllBookings);
router.post("/set-online-review/:bookingid", setReviewbyBookingId);

module.exports = router;
