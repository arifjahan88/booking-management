const Hotelbooking = require("../../../models/hotel-model/hotelBookingModel");
const Hotel = require("../../../models/hotel-model/hotelModel");
const OnlineBooking = require("../../../models/online-booking-model/onlineBookingModel");
const asyncHandler = require("../../../utils/asyncHandler");
const { createError } = require("../../../utils/error");

//Create Hotel Booking
exports.addHotelBooking = asyncHandler(async (req, res) => {
  const { onlinebookingId, isBooked, ...body } = req.body;

  const createBooking = await Hotelbooking.create(body);
  if (!createBooking) {
    throw createError(400, "Create Booking Failed");
  }

  const { _id, hotelId } = createBooking;

  const pushbooking = await Hotel.updateOne({ _id: hotelId }, { $push: { currentBookings: _id } });

  if (!pushbooking) {
    throw createError(400, "Push Booking Failed");
  }

  if (isBooked && isBooked === true) {
    await OnlineBooking.findOneAndUpdate(
      { _id: onlinebookingId },
      { $set: { isBooked: true } },
      { new: true }
    );
  }

  res.status(200).json({
    success: true,
    message: "Create Booking Successfully",
    data: createBooking,
  });
});

//get booked roomnumber
exports.getBookedRoomNumber = asyncHandler(async (req, res) => {
  const { id, date } = req.query;

  const findHotel = await Hotel.findOne({ _id: id }).populate("currentBookings");

  if (!findHotel) {
    throw createError(400, "Find Booked Room Failed");
  }
  const filteredBookings = findHotel?.currentBookings?.filter((booking) => {
    const checkinDate = new Date(booking?.checkInDate);
    const checkoutDate = new Date(booking?.checkOutDate);
    const targetDate = new Date(date);

    return targetDate >= checkinDate && targetDate <= checkoutDate;
  });

  const bookedRoomNumbers = filteredBookings?.map((booking) => booking?.roomNumber).flat();

  res.status(200).json({
    success: true,
    message: "Find Booked Room Successfully",
    bookedroom: bookedRoomNumbers,
  });
});

//get roomnumber by roomname
exports.getRoomNumberbyRoomName = asyncHandler(async (req, res) => {
  const { id, date, roomName } = req.query;
  const findHotel = await Hotel.findOne({ _id: id }).populate("currentBookings");

  if (!findHotel) {
    throw createError(400, "Find Booked Room Failed");
  }

  const filteredBookings = findHotel?.currentBookings?.filter((booking) => {
    const checkinDate = new Date(booking?.checkInDate);
    const checkoutDate = new Date(booking?.checkOutDate);
    const targetDate = new Date(date);
    const bookedRoomNames = booking?.roomName?.map((room) => room);

    return (
      targetDate >= checkinDate && targetDate <= checkoutDate && bookedRoomNames.includes(roomName)
    );
  });

  const bookedRooms = filteredBookings.map((booking) => booking?.roomNumber).flat();

  const findRoom = findHotel?.hotelRooms?.find((room) => room.roomName === roomName);
  const availableRoomNumbers = findRoom?.roomnumber?.filter(
    (roomNumber) => !bookedRooms.includes(roomNumber)
  );

  res.status(200).json({
    success: true,
    message: "Find Booked Room Successfully",
    data: availableRoomNumbers,
  });
});

//get all booking
exports.getAllCurrentHotelBooking = asyncHandler(async (req, res) => {
  const { hotelid } = req.params;
  const allBooking = await Hotel.findOne({ _id: hotelid }).populate("currentBookings");

  if (!allBooking) {
    throw createError(400, "Find Booking Failed");
  }

  const filterBookings = allBooking?.currentBookings
    .filter((booking) => booking.isCheckIn)
    .map((booking) => ({
      ...booking._doc, // Spread the booking details
      hotelInfo: {
        hotelName: allBooking?.hotelName,
        hotelAddress: allBooking?.hotelAddress,
        hotelWebsite: allBooking?.website,
        hotelEmail: allBooking?.email,
      },
    }));

  res.status(200).json({
    success: true,
    message: "Get All Booking Successfully",
    data: filterBookings,
  });
});

//get All previous booking
exports.getAllPreviousBooking = asyncHandler(async (req, res) => {
  const { hotelid } = req.params;

  const findHotel = await Hotelbooking.find({ isCheckIn: false, hotelId: hotelid }).select(
    "-createdAt -updatedAt -__v -_id"
  );

  if (!findHotel) {
    throw createError(400, "Find Booking Failed");
  }

  res.status(200).json({
    success: true,
    message: "Get All Previous Booking Successfully",
    data: findHotel,
  });
});

//delete booking
exports.deleteBooking = asyncHandler(async (req, res) => {
  const { bookingid, hotelid } = req?.query;

  const findbooking = await Hotelbooking.findOne({ _id: bookingid });
  if (!findbooking) {
    throw createError(400, "This Booking Not Found");
  }

  const findHotel = await Hotel.findOne({ _id: hotelid }).select("currentBookings");
  if (!findHotel) {
    throw createError(400, "This Hotel Not Found");
  }

  const findbookingid = findHotel.currentBookings.find((booking) => booking == bookingid);
  if (!findbookingid) {
    throw createError(400, "This Booking Not Found");
  }

  findHotel.currentBookings = findHotel.currentBookings.filter((booking) => booking != bookingid);

  await Hotelbooking.deleteOne({ _id: bookingid }, { new: true });
  await findHotel.save({ new: true });

  res.status(200).json({
    success: true,
    message: "Delete Booking Successfully",
  });
});

//update due payment
exports.updateDuePayment = asyncHandler(async (req, res) => {
  const { bookingid, amount } = req.body;

  const findbooking = await Hotelbooking.findOne({ _id: bookingid });
  if (!findbooking) {
    throw createError(400, "This Booking Not Found");
  }

  findbooking.paidAmount = findbooking.paidAmount + parseInt(amount);
  if (findbooking.paidAmount > findbooking.totalAmount) {
    throw createError(400, "Paid Amount is greater than Total Amount");
  }

  await findbooking.save({ new: true });

  res.status(200).json({
    success: true,
    message: "Update Due Payment Successfully",
    findbooking,
  });
});

//update checkin to checkout
exports.updatecheckin = asyncHandler(async (req, res) => {
  const { bookingid } = req.params;

  const findbooking = await Hotelbooking.findOne({ _id: bookingid });
  const findHotel = await Hotel.findOne({ _id: findbooking?.hotelId });

  if (!findbooking || !findHotel) {
    throw createError(400, "This Booking Not Found");
  }

  findbooking.isCheckIn = false;
  findHotel.currentBookings = findHotel?.currentBookings?.filter((booking) => booking != bookingid);

  await findbooking.save({ new: true });
  await findHotel.save({ new: true });

  res.status(200).json({
    success: true,
    message: "Checkout Successfully",
  });
});

//get all booking by hotel id
exports.getAllBookingByHotelId = asyncHandler(async (req, res) => {
  const { hotelid } = req.params;

  const findBookings = await Hotelbooking.find({ hotelId: hotelid })
    .select("-updatedAt -__v -_id")
    .populate({
      path: "bookedBy",
      select: "fullname",
    });

  if (!findBookings) {
    throw createError(400, "Find Booking Failed");
  }

  res.status(200).json({
    success: true,
    message: "Get All Booking Successfully",
    data: findBookings,
  });
});

//get Customer Data by roomname
exports.getGuestDatabyRoomnumber = asyncHandler(async (req, res) => {
  const { roomnumber, hotelId, date } = req.query;

  if (!roomnumber || !hotelId || !date) {
    throw createError(400, "All Fields are Required");
  }

  const formData = new FormData();

  const findHotel = await Hotel.findOne({ _id: hotelId })
    .populate("currentBookings")
    .select("currentBookings");

  const bookingWithCustomer = findHotel?.currentBookings?.filter((booking) => {
    return (
      booking?.roomNumber.includes(roomnumber) &&
      new Date(booking?.checkInDate) <= new Date(date) &&
      new Date(booking?.checkOutDate) >= new Date(date)
    );
  });

  res.status(200).json({
    success: true,
    message: "Get All Booking Successfully",
    data: bookingWithCustomer,
  });
});

//Add Addons
exports.addBookingAddons = asyncHandler(async (req, res) => {
  const { bookingid } = req.params;
  const { addonsData, date } = req.body;

  const findbooking = await Hotelbooking.findOne({ _id: bookingid });

  if (!findbooking) {
    throw createError(400, "This Booking Not Found");
  }

  const existingDateIndex = findbooking?.addons?.findIndex((addon) => addon.date === date);

  const updatedAddons = findbooking.addons.map((addon, index) => {
    if (index === existingDateIndex) {
      return {
        ...addon,
        addonsData: [...addon?.addonsData, ...addonsData],
      };
    }
    return addon;
  });

  if (existingDateIndex === -1) {
    updatedAddons.push({
      date: date,
      addonsData: addonsData,
    });
  }

  const updatetotalAmount = addonsData?.reduce((acc, addon) => acc + addon.total, 0);

  await Hotelbooking.findOneAndUpdate(
    { _id: bookingid },
    { $set: { addons: updatedAddons }, $inc: { totalAmount: updatetotalAmount || 0 } },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "Addons Added Successfully",
  });
});

//get All Mobile Number by hotel id
exports.getHotelAllPhoneNumber = asyncHandler(async (req, res) => {
  const { hotelid } = req.params;

  if (!hotelid) {
    throw createError(400, "Hotel Id is Required");
  }

  const findPhoneNumber = await Hotelbooking.find({ hotelId: hotelid })
    .select("guestNumber -_id")
    .distinct("guestNumber");

  if (!findPhoneNumber) {
    throw createError(400, "Find Phone Number Failed");
  }

  res.status(200).json({
    success: true,
    message: "Get Customer info Successfully",
    data: findPhoneNumber,
  });
});

//find booking by mobile number
exports.getBookingByGuestMobile = asyncHandler(async (req, res) => {
  const { phone, hotelid } = req.query;

  const findCustomer = await Hotelbooking.findOne({ hotelId: hotelid, guestNumber: phone });

  res.status(200).json({
    success: true,
    message: "Get Customer info Successfully",
    data: findCustomer,
  });
});
