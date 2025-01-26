const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  _id:{type:String},
  name: {type:String},
  description: {type:String},
  price: {type:Number},
  qty: {type:Number}
});

const menuModel = mongoose.model('MenuList', menuSchema, 'MenuList');

module.exports = menuModel;
