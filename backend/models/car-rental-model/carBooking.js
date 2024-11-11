const mongoose = require("mongoose");
const { Schema } = mongoose;

const carBookingSchema = new Schema(
  {
    address: { type: String },
    authNumber: { type: String },
    authType: { type: String },
    bookingReference: { type: String },
    carInfo: Object,
    dueAmount: { type: Number, required: true },
    endDate: { type: Date, required: true },
    guestEmail: {
      type: String,
      required: true,
      unique: [true, "Email Already Exist"],
      index: true,
    },
    guestName: { type: String, required: true },
    guestNumber: { type: String, required: true },
    paidAmount: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    startDate: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    transactionid: { type: String, unique: [true, "Transaction Id Already Exist"] },
    isBooked: { type: Boolean, default: false },
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CarRentBooking = mongoose.model("CarRentBooking", carBookingSchema);

module.exports = CarRentBooking;
