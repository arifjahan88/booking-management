const Hotel = require("../../models/hotel-model/hotelModel");
const asyncHandler = require("../../utils/asyncHandler");
const calculateReview = require("../../utils/calculateReview");
const { createError } = require("../../utils/error");

//Add Hotel Controller
exports.addHotel = asyncHandler(async (req, res, next) => {
  const createHall = await Hotel.create(req.body);
  if (!createHall) {
    throw createError(400, "Add Hotel Failed");
  }

  res.status(200).json({
    success: true,
    message: "Add Hotel Successfully",
    data: req.body,
  });
});

//Get All Hotel Name Controller
exports.getAllHotelName = asyncHandler(async (req, res, next) => {
  const findHotel = await Hotel.find().select("hotelName _id");

  if (!findHotel) {
    throw createError(400, "Find Hotel Failed");
  }

  res.status(200).json({
    success: true,
    message: "Find All Hotel Name Successfully",
    data: findHotel,
  });
});

//Get Hotel By Id Controller
exports.getHotelById = asyncHandler(async (req, res, next) => {
  if (!req.params.id) {
    throw createError(400, "Hotel Id is Required");
  }

  const findHotel = await Hotel.findById(req.params.id)
    .select("-hotelRooms._id -createdAt -updatedAt -__v -currentBookings")
    .lean();

  if (!findHotel) {
    throw createError(400, "Find Hotel Failed");
  }

  const reviewData = await calculateReview(req.params.id);

  res.status(200).json({
    success: true,
    message: "Find Hotel Successfully",
    data: { ...findHotel, reviews: reviewData },
  });
});

//update Hotel information Controller
exports.updateHotel = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const {
    city,
    country,
    email,
    hotelAddress,
    hotelDescription,
    hotelName,
    hotelStar,
    phoneNumber,
    state,
    website,
    nearByLocations,
    hotelFacilites,
    hotelRooms,
  } = req.body;

  if (!id) {
    throw createError(400, "Hotel Id is Required");
  }

  const hotel = await Hotel.findById(id);
  if (!hotel) {
    throw createError(404, "Hotel not found");
  }

  const updateHotel = await Hotel.findByIdAndUpdate(
    id,
    {
      city,
      country,
      email,
      hotelAddress,
      hotelDescription,
      hotelName,
      hotelStar,
      phoneNumber,
      state,
      website,
      nearByLocations,
      hotelFacilites,
      hotelRooms,
    },
    {
      new: true,
    }
  );

  if (!updateHotel) {
    throw createError(400, "Update Hotel Failed");
  }

  res.status(200).json({
    success: true,
    message: "Update Hotel Successfully",
    data: updateHotel,
  });
});

//set Hotel Room offer price Controller
exports.setRoomOfferPrice = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { roomName, roomPrice, roomDiscount, roomDiscountPrice } = req.body;

  if (!id) {
    throw createError(400, "Hotel Id is Required");
  }

  const hotel = await Hotel.findById(id).select("hotelRooms");
  if (!hotel) {
    throw createError(404, "Hotel not found");
  }

  const roomdata = hotel?.hotelRooms?.find((room) => room.roomName === roomName);
  if (!roomdata) {
    throw createError(404, "Room not found");
  }

  roomdata.offerPrice = { roomPrice, roomDiscount, roomDiscountPrice };
  roomdata.activeOffers = true;

  const updateoffer = await hotel.save();

  if (!updateoffer) {
    throw createError(400, "Set Room Offer Price Failed");
  }

  res.status(200).json({
    success: true,
    message: "Set Room Offer Price Successfully",
  });
});
