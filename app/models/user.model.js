const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        primary: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: '',
      },
      

});
const User= mongoose.model('User', userSchema); 
module.exports = User;
