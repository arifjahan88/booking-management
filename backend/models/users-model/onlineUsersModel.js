const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const onlineUserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    hotelBooking: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OnlineBooking",
        default: [],
      },
    ],
    carRentBooking: {
      type: Array,
      default: [],
    },
    tourGuideBooking: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

//Hashing Password
onlineUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//Compare Password
onlineUserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//create token
onlineUserSchema.methods.createToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullname: this.fullname,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );
};

const OnlineUser = mongoose.model("OnlineUser", onlineUserSchema);

module.exports = OnlineUser;
