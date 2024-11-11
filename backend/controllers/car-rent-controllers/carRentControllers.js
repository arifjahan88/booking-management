const CarRentBooking = require("../../models/car-rental-model/carBooking");
const CarRentCompany = require("../../models/car-rental-model/companyModel");
const asyncHandler = require("../../utils/asyncHandler");
const { createError } = require("../../utils/error");

// exports.SentEmail = asyncHandler(async (req, res) => {
//   const { email, message } = req.body;

//   await sendEmail(email, message);

//   res.status(200).json({
//     success: true,
//     message: "Sent Email Successfully",
//   });
// });

//Add Car Company Controller
exports.addCarRentCompany = asyncHandler(async (req, res, next) => {
  const addCompany = await CarRentCompany.create(req.body);
  if (!addCompany) {
    throw createError(500, "Add Company Failed");
  }
  res.status(200).json({
    success: true,
    message: "Add Company Successfully",
    data: addCompany,
  });
});

//get Car Company cars
exports.getCarCompanyCars = asyncHandler(async (req, res, next) => {
  const { marchentid } = req.user;
  const { startdate, enddate } = req.query;

  const findCompany = await CarRentCompany.findById(marchentid).populate("bookedCars");

  if (!findCompany) {
    throw createError(404, "Company Not Found");
  }

  const requestedStartDate = new Date(startdate);
  const requestedEndDate = new Date(enddate);

  const availableCars = findCompany?.cars?.filter((car) => {
    const isAvailable = !findCompany?.bookedCars?.some((bookedCar) => {
      const bookedStartDate = new Date(bookedCar?.startDate);
      const bookedEndDate = new Date(bookedCar?.endDate);

      return (
        bookedCar?.carInfo?._id.toString() === car?._id.toString() &&
        ((requestedStartDate >= bookedStartDate && requestedStartDate < bookedEndDate) ||
          (requestedEndDate > bookedStartDate && requestedEndDate <= bookedEndDate) ||
          (requestedStartDate <= bookedStartDate && requestedEndDate >= bookedEndDate))
      );
    });

    return isAvailable;
  });

  const { bookedCars, ...rest } = findCompany.toObject();

  res.status(200).json({
    success: true,
    message: "Find Company Cars Successfully",
    data: {
      ...rest,
      cars: availableCars,
    },
  });
});

//booking Car
exports.AddCarBooking = asyncHandler(async (req, res, next) => {
  const { marchentid } = req.user;

  const createBooking = await CarRentBooking.create(req.body);

  if (!createBooking) {
    throw createError(400, "Create Booking Failed");
  }

  const { _id } = createBooking;
  const pushbooking = await CarRentCompany.updateOne(
    { _id: marchentid },
    { $push: { bookedCars: _id }, runValidators: false }
  );

  if (!pushbooking) {
    throw createError(400, "Booking Failed");
  }

  res.status(200).json({
    success: true,
    message: "Add Booking Successfully",
  });
});

//get Running Booking Car
exports.getRunningBookingCar = asyncHandler(async (req, res, next) => {
  const { marchentid } = req.user;

  const findBooking = await CarRentCompany.findById(marchentid)
    .populate("bookedCars")
    .select("-cars");

  if (!findBooking) {
    throw createError(404, "Booking Not Found");
  }

  res.status(200).json({
    success: true,
    message: "Find Booking Successfully",
    data: findBooking,
  });
});

//delete Booking Car
exports.deleteBookingCar = asyncHandler(async (req, res, next) => {
  const { marchentid } = req.user;
  const { bookingid } = req.params;

  const findBooking = await CarRentBooking.findById(bookingid);

  if (!findBooking) {
    throw createError(404, "Booking Not Found");
  }

  const deleteBooking = await CarRentBooking.findByIdAndDelete(bookingid);

  if (!deleteBooking) {
    throw createError(400, "Delete Booking Failed");
  }

  const deleteFromCompany = await CarRentCompany.updateOne(
    { _id: marchentid },
    { $pull: { bookedCars: bookingid } },
    { new: true, runValidators: false }
  );

  if (!deleteFromCompany) {
    throw createError(400, "Delete Booking Failed");
  }

  res.status(200).json({
    success: true,
    message: "Delete Booking Successfully",
  });
});

//Booked Out Car
exports.updateBookedOutCar = asyncHandler(async (req, res, next) => {
  const { bookingid } = req.params;
  const { marchentid } = req.user;

  console.log(marchentid);

  const findCarBooking = await CarRentBooking.findById(bookingid);
  const findCarCompany = await CarRentCompany.findById(marchentid);

  if (!findCarBooking || !findCarCompany) {
    throw createError(400, "This Car Booking Not Found");
  }

  findCarBooking.isBooked = false;
  findCarCompany.bookedCars = findCarCompany?.bookedCars?.filter((booking) => booking != bookingid);

  await findCarBooking.save({ new: true });
  await findCarCompany.save({ new: true });

  res.status(200).json({
    success: true,
    message: "Booked Out Successfully",
  });
});

//get previous booking car
exports.getPreviousBookingCar = asyncHandler(async (req, res, next) => {
  const { marchentid } = req.user;

  const findBooking = await CarRentBooking.find({
    isBooked: false,
    "carInfo.hotelId": marchentid.toString(),
  }).select("-createdAt -updatedAt -__v -_id");

  if (!findBooking) {
    throw createError(400, "Find Booking Failed");
  }

  res.status(200).json({
    success: true,
    message: "Find Booking Successfully",
    data: findBooking,
  });
});
