const express = require("express");
const {
  addHotel,
  // getAllhotel,
  getAllHotelName,
  getHotelById,
  updateHotel,
  setRoomOfferPrice,
} = require("../../controllers/hotel-controllers/hotelController");

const router = express.Router();

router.post("/add-hotel", addHotel);
// router.get("/get-allhotel", getAllhotel);
router.get("/get-allhotelName", getAllHotelName);
router.get("/get-hotelbyid/:id", getHotelById);
router.post("/updatehotel/:id", updateHotel);
router.post("/set-offerprice/:id", setRoomOfferPrice);

module.exports = router;
