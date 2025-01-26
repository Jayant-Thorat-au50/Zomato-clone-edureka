const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  _id: { type: String },
  name: { type: String },
  city_name: { type: String },
  city: { type: String },
  area: { type: String },
  locality: { type: String },
  thumb: { type: String },
  cost: { type: Number },
  address: { type: String },
  type: { type: Array },
  cuisine_id: { type: Array},
  location_id:{type:Number}
  
});

const restaurantModels = mongoose.model(
  "restaurant",
  userSchema,
  "reasturantsData"
);

module.exports = restaurantModels;
