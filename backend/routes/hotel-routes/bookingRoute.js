const express = require("express");
const {
  addHotelBooking,
  getBookedRoomNumber,
  getRoomNumberbyRoomName,
  getAllPreviousBooking,
  deleteBooking,
  updateDuePayment,
  updatecheckin,
  getAllBookingByHotelId,
  getGuestDatabyRoomnumber,
  addBookingAddons,
  getAllCurrentHotelBooking,
  getBookingByGuestMobile,
  getHotelAllPhoneNumber,
} = require("../../controllers/hotel-controllers/booking/hotelBookingController");
const {
  createOnlineBooking,
  getOnlineBookingsbyHotelid,
  getRoomNumbersbyRoomNameOnlineBooking,
} = require("../../controllers/online-booking-controllers/onlineBookingController");
const verifyToken = require("../../middleware/verifyToken");

const router = express.Router();

//Online Booking
router.post("/add-online-hotelbooking", verifyToken, createOnlineBooking);
router.get("/get-online-hotelbookings-byid/:hotelid", getOnlineBookingsbyHotelid);
router.get("/get-online-hotelbookings-roomnumbers", getRoomNumbersbyRoomNameOnlineBooking);

//verify token in all routes
router.use(verifyToken);

//HotelBooking
router.post("/add-hotelbooking", addHotelBooking);
router.get("/get-bookedroom", getBookedRoomNumber);
router.get("/get-bookedroomnumbers", getRoomNumberbyRoomName);
router.get("/get-current-hotelBooking/:hotelid", getAllCurrentHotelBooking);
router.get("/get-previous-bookings/:hotelid", getAllPreviousBooking);
router.delete("/delete-booking", deleteBooking);
router.put("/udpate-payment", updateDuePayment);
router.put("/udpate-checkin/:bookingid", updatecheckin);
router.get("/get-allbookings/:hotelid", getAllBookingByHotelId);
router.get("/get-guestDatabyroomnumber", getGuestDatabyRoomnumber);
router.put("/add-addons/:bookingid", addBookingAddons);
router.get("/get-hotelallphonenumber/:hotelid", getHotelAllPhoneNumber);
router.get("/get-guestinfo-byphone", getBookingByGuestMobile);

module.exports = router;
