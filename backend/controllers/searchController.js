const Hotel = require("../models/hotel-model/hotelModel");
const asyncHandler = require("../utils/asyncHandler");
const calculateReview = require("../utils/calculateReview");
const { createError } = require("../utils/error");

//get all Hotel location Controller
exports.getLocation = asyncHandler(async (req, res, next) => {
  const findLocation = await Hotel.find().select("city country -_id");

  if (!findLocation) {
    throw createError(400, "Find Location Failed");
  }

  // Creating a map to store unique hotels by name
  const uniqueLocation = {};
  findLocation.forEach((location) => {
    if (!uniqueLocation[location.city]) {
      uniqueLocation[location.city] = location;
    }
  });

  const uniqueHotelList = Object.values(uniqueLocation);

  res.status(200).json({
    success: true,
    message: "Find Location Successfully",
    data: uniqueHotelList,
  });
});

//get all filter search Controller
exports.getFilterSearch = asyncHandler(async (req, res, next) => {
  const hotelData = await Hotel.find();

  if (!hotelData) {
    throw createError(400, "Find Hotel Failed");
  }

  const uniqueHotelStars = [...new Set(hotelData.map((hotel) => hotel.hotelStar))];
  const uniqueHotelFacilities = [
    ...new Set(hotelData.map((hotel) => Object.values(hotel.hotelFacilites).flat()).flat()),
  ];
  let maxRoomPrice = -Infinity;
  hotelData?.forEach((hotel) => {
    hotel?.hotelRooms?.forEach((room) => {
      if (room?.roomPrice > maxRoomPrice) {
        maxRoomPrice = room.roomPrice;
      }
    });
  });

  res.status(200).json({
    success: true,
    message: "Find Hotel Successfully",
    data: { hotelStars: uniqueHotelStars, hotelFacilities: uniqueHotelFacilities, maxRoomPrice },
  });
});

//update filter search Controller
exports.updateFilterSearch = asyncHandler(async (req, res, next) => {
  const { hotelStar, facilityValues, searchName, minPrice, maxPrice, cityName } = req.body;

  // Constructing the query dynamically based on the provided input
  const queryConditions = [];

  if (cityName && cityName.trim()) {
    queryConditions.push({ city: cityName });
  }

  if (searchName && searchName.trim()) {
    queryConditions.push({ hotelName: { $regex: searchName, $options: "i" } });
  }

  if (hotelStar && hotelStar.length > 0) {
    queryConditions.push({ hotelStar: { $in: hotelStar } });
  }

  if (facilityValues && facilityValues.length > 0) {
    queryConditions.push({
      $or: [
        { "hotelFacilites.populer": { $in: facilityValues } },
        { "hotelFacilites.For the kids": { $in: facilityValues } },
        { "hotelFacilites.Service And Convenience": { $in: facilityValues } },
      ],
    });
  }

  if (minPrice != null && maxPrice != null) {
    queryConditions.push({
      hotelRooms: {
        $elemMatch: {
          roomPrice: {
            $gte: minPrice,
            $lte: maxPrice,
          },
        },
      },
    });
  }

  // Ensure that there is at least one valid condition to search for
  if (!queryConditions.length) {
    throw createError(400, "No valid search criteria provided");
  }

  const hotelData = await Hotel.find({
    $and: queryConditions,
  }).select("-currentBookings -createdAt -updatedAt -__v");

  if (!hotelData) {
    throw createError(400, "Find Hotel Failed");
  }

  const hotelsWithReviews = await Promise.all(
    hotelData?.map(async (hotel) => {
      const reviewData = await calculateReview(hotel?._id?.toString());
      return { ...hotel.toObject(), reviews: reviewData };
    })
  );

  res.status(200).json({
    success: true,
    message: "Find Hotel Successfully",
    data: hotelsWithReviews,
  });
});
