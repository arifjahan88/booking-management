const mongoose = require("mongoose");
const { Schema } = mongoose;

const hotelSchema = new Schema(
  {
    hotelId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    hotelName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    hotelImages: {
      type: Array,
      // required: true,
      default: [],
    },
    hotelStar: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    hotelAddress: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    hotelDescription: {
      type: String,
    },
    website: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    hotelFacilites: {
      type: Object,
      required: true,
    },
    hotelRooms: [
      {
        roomName: { type: String, required: true },
        roomType: { type: String, required: true },
        roomImages: { type: Array, default: [] },
        roomDescription: String,
        roomPrice: { type: Number, required: true },
        maxGuests: String,
        roomnumber: [],
        roomFacilities: [],
        offerPrice: {
          type: Array,
          default: [],
        },
        activeOffers: {
          type: Boolean,
          default: false,
        },
      },
    ],
    nearByLocations: {
      type: Object,
      required: true,
    },
    currentBookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotelbooking",
        default: [],
      },
    ],
    reviews: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
