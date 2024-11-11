const express = require("express");
const {
  addCarRentCompany,
  getCarCompanyCars,
  AddCarBooking,
  getRunningBookingCar,
  deleteBookingCar,
  updateBookedOutCar,
  getPreviousBookingCar,
} = require("../../controllers/car-rent-controllers/carRentControllers");
const verifyCarRental = require("../../middleware/verifyCarRental");

const router = express.Router();

router.post("/add-company", addCarRentCompany);
router.get("/get-company-cars", verifyCarRental, getCarCompanyCars);
router.post("/add-booking-cars", verifyCarRental, AddCarBooking);
router.get("/get-running-cars", verifyCarRental, getRunningBookingCar);
router.delete("/delete-running-cars/:bookingid", verifyCarRental, deleteBookingCar);
router.put("/update-booked-cars/:bookingid", verifyCarRental, updateBookedOutCar);
router.get("/get-previous-cars", verifyCarRental, getPreviousBookingCar);

module.exports = router;
