const { format } = require("date-fns");
const OnlineBooking = require("../../models/online-booking-model/onlineBookingModel");
const asyncHandler = require("../../utils/asyncHandler");
const { createError } = require("../../utils/error");
const OnlineUser = require("../../models/users-model/onlineUsersModel");
const Hotel = require("../../models/hotel-model/hotelModel");

//Create Hotel Booking
exports.createOnlineBooking = asyncHandler(async (req, res) => {
  const body = req.body;

  const createOnlineBooking = await OnlineBooking.create(body);
  if (!createOnlineBooking) {
    throw createError(400, "Create Booking Failed");
  }

  if (!req.user) {
    throw createError(400, "User Not Found");
  }

  if (body?.roomName && body?.hotelInfo?._id) {
    await OnlineUser.findByIdAndUpdate(
      {
        _id: req.user._id,
      },
      {
        $push: {
          hotelBooking: createOnlineBooking._id,
        },
      }
    );
  }

  res.status(200).json({
    success: true,
    message: "Booking Create Successfully",
    data: createOnlineBooking,
  });
});

//get booking by hotel id
exports.getOnlineBookingsbyHotelid = asyncHandler(async (req, res) => {
  const { hotelid } = req.params;

  const getBookings = await OnlineBooking.find({ "hotelInfo._id": hotelid })
    .sort({ createdAt: -1 })
    .select("-__v -createdAt -updatedAt");

  if (!getBookings) {
    throw createError(400, "Get Booking Failed");
  }

  res.status(200).json({
    success: true,
    message: "Booking get Successfully",
    data: getBookings,
  });
});

//get roomnumber by roomnames
exports.getRoomNumbersbyRoomNameOnlineBooking = asyncHandler(async (req, res) => {
  const { hotelid, roomnames } = req.query;

  if (!hotelid || !roomnames) {
    throw createError(400, "Hotel Id and Room Name are required");
  }

  const roomnamesArray = roomnames.split(",");
  const todayDate = format(new Date(), "yyyy-MM-dd");
  const findHotel = await Hotel.findOne({ _id: hotelid }).populate("currentBookings");

  if (!findHotel) {
    throw createError(400, "Find Booked Room Failed");
  }

  const bookedRooms = findHotel.currentBookings
    .filter(
      (booking) =>
        new Date(todayDate) >= new Date(booking.checkInDate) &&
        new Date(todayDate) <= new Date(booking.checkOutDate) &&
        booking.roomName.some((name) => roomnamesArray.includes(name))
    )
    .flatMap((booking) => booking.roomNumber);

  const availableRoomNumbers = roomnamesArray.flatMap((roomName) => {
    const findRoom = findHotel.hotelRooms.find((room) => room.roomName === roomName);
    return findRoom?.roomnumber?.filter((roomNumber) => !bookedRooms.includes(roomNumber)) || [];
  });

  const HotelRooms = findHotel.hotelRooms
    .filter((room) => roomnamesArray.includes(room.roomName))
    .map((room) => {
      return {
        roomName: room?.roomName,
        roomNumber: room?.roomnumber,
        roomPrice: room?.roomPrice,
        offerPrice:
          room?.activeOffers && room?.offerPrice?.length > 0
            ? room?.offerPrice[0]?.roomDiscountPrice
            : undefined,
      };
    });

  res.status(200).json({
    success: true,
    message: "Find Booked Room Successfully",
    data: availableRoomNumbers,
    HotelRooms,
  });
});

//set review by booking id
exports.setReviewbyBookingId = asyncHandler(async (req, res) => {
  const { bookingid } = req.params;
  const review = req.body;

  if (!bookingid || !review) {
    throw createError(400, "Booking Id and Review are required");
  }

  const setReview = await OnlineBooking.findByIdAndUpdate(
    {
      _id: bookingid,
    },
    {
      $set: {
        review: review,
      },
    },
    {
      new: true,
    }
  );

  if (!setReview) {
    throw createError(400, "Set Review Failed");
  }

  res.status(200).json({
    success: true,
    message: "Review Successfully",
    data: setReview,
  });
});
