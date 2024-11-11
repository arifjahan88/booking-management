const mongoose = require("mongoose");
const { Schema } = mongoose;

const carrentschema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    companyEmail: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    companyPhone: {
      type: String,
      required: true,
    },
    companyAddress: {
      type: String,
      required: true,
    },
    companyLogo: {
      type: Object,
      required: true,
    },
    cars: {
      type: [
        {
          carName: { type: String, required: true },
          carModel: { type: String, required: true },
          carType: { type: String, required: true },
          carNumber: { type: String, required: true },
          carPrice: { type: String, required: true },
          carImage: { type: Object, required: true },
          carFitnessExpireDate: { type: String, required: true },
        },
      ],
      default: [],
    },
    bookedCars: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CarRentBooking",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CarRentCompany = mongoose.model("CarRentCompany", carrentschema);

module.exports = CarRentCompany;
