const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usersSchema = new Schema(
  {
    marchentid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
      unique: true,
      index: true,
    },
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
      trim: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      //   enum: ["user", "admin"],
    },
    // status: {
    //   type: String,
    //   required: true,
    //   //   enum: ["active", "inactive"],
    //   default: "active",
    // },
  },
  {
    timestamps: true,
  }
);

//Hashing Password
usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//Compare Password
usersSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//create token
usersSchema.methods.createToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      marchentid: this.marchentid,
      email: this.email,
      fullname: this.fullname,
      role: this.role,
      //   status: this.status,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );
};

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
