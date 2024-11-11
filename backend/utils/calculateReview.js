const OnlineBooking = require("../models/online-booking-model/onlineBookingModel");
const { createError } = require("./error");

const calculateReview = async (hotelId) => {
  try {
    const findReviews = await OnlineBooking.find({ "hotelInfo._id": hotelId });
    const filteredReviews = findReviews?.filter(
      (review) => review?.review && Object.keys(review.review).length > 0
    );

    const review = filteredReviews?.reduce((acc, { review }) => {
      for (const key in review) {
        acc[key] = Math.ceil((acc[key] || 0) + (review[key] || 0));
      }
      return acc;
    }, {});

    for (const key in review) {
      review[key] = Math.ceil(review[key] / filteredReviews.length);
    }

    return review;
  } catch (error) {
    throw createError(400, "Something went wrong while calculating review.");
  }
};

module.exports = calculateReview;
