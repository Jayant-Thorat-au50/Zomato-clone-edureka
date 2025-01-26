const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: { type: String },
  name: { type: String },
  city_id: { type: String },
  location_id: { type: Number },
  country_name: { type: String },
});

const locationModels = mongoose.model('location', userSchema, 'location');

module.exports = locationModels;
