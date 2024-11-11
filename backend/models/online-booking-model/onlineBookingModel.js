const mongoose = require("mongoose");
const { Schema } = mongoose;

const onlineBookingSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    adult: {
      type: Number,
      required: true,
    },
    children: {
      type: Number,
      required: true,
    },
    room: {
      type: Number,
      required: true,
    },
    roomName: {
      type: Array,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    overallPrice: {
      type: Number,
      required: true,
    },
    previousPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    hotelInfo: {
      type: Object,
      required: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    review: {
      type: Object,
      default: {},
    },
    guestReq: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const OnlineBooking = mongoose.model("OnlineBooking", onlineBookingSchema);

module.exports = OnlineBooking;
