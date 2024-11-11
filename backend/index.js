const express = require("express");
const cors = require("cors");
const { connectDb } = require("./utils/connectDb");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

//middleWire
app.use(cors());
app.use(express.json());

//MongoDb connection
connectDb();

//Routes
app.use("/api/v1/hotel", require("./routes/hotel-routes/hotelRoute"));
app.use("/api/v1/search", require("./routes/searchRoute"));
app.use("/api/v1/onlineuser", require("./routes/users-route/onlineUserRoute"));
app.use("/api/v1/users", require("./routes/users-route/UsersRoute"));
app.use("/api/v1/booking", require("./routes/hotel-routes/bookingRoute"));
app.use("/api/v1/car-rent", require("./routes/car-rental-routes/carRentalRoute"));

app.get("/", async (req, res) => {
  res.send("Booking Management server is running");
});

//Error Handeling
app.use((err, req, res, next) => {
  if (err.code === 11000) {
    const duplicateKey = Object.keys(err.keyValue)[0];
    const duplicateValue = err.keyValue[duplicateKey];
    const errorMessage = `${duplicateKey} "${duplicateValue}" already exists.`;
    return res.status(400).json({ success: false, message: errorMessage });
  }

  if (err.name === "ValidationError") {
    const validationErrors = Object.values(err.errors).map((error) => error.message);
    return res.status(400).json({ success: false, message: validationErrors });
  }

  const errorStatus = err.status || 500;
  const errorMassage = err.message || "Something went wrong";
  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMassage,
    stack: err.stack,
  });
});

// //All
app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => console.log(`Booking Management Server running on ${port}`));
