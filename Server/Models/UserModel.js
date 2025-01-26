
const mongoose = require('mongoose');

const {Schema} = mongoose

const userSchema = new Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    mobile:{type:String},
    address:{type:String}
})

const UserModel = mongoose.model('users', userSchema, 'users')

module.exports = UserModel