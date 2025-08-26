// models/Car.js

const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price_per_day: { type: Number, required: true },
  seats: { type: Number, required: true },
  fuel_type: { type: String, required: true },
  transmission: { type: String, required: true },
  image_url: { type: String, required: true },
});

module.exports = mongoose.model("Car", carSchema);
