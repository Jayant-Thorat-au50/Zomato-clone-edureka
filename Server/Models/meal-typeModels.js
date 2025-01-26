
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    _id:{type:String},
    name:{type:String},
    content:{type:String},
    image:{type:String}

});

const mealTypeModels = mongoose.model('mealType', userSchema, 'mealtype');

module.exports = mealTypeModels;
