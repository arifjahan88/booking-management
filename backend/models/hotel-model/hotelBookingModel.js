const mongoose = require("mongoose");
const { Schema } = mongoose;

const hotelbookingSchema = new Schema(
  {
    guestName: {
      type: String,
      required: true,
      trim: true,
    },
    hotelId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    address: String,
    authType: String,
    authNumber: String,
    guestEmail: {
      type: String,
      required: true,
    },
    guestNumber: {
      type: String,
      required: true,
    },
    roomName: {
      type: Array,
      required: true,
    },
    roomNumber: {
      type: Array,
      required: true,
    },
    addons: {
      type: Array,
      default: [],
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paidAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
    },
    birthDate: String,
    marriageDate: String,
    checkInDate: {
      type: String,
      required: true,
    },
    checkOutDate: {
      type: String,
      required: true,
    },
    isCounter: {
      type: Boolean,
      default: true,
    },
    isCheckIn: {
      type: Boolean,
      default: true,
    },
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    guestReq: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Hotelbooking = mongoose.model("Hotelbooking", hotelbookingSchema);

module.exports = Hotelbooking;
