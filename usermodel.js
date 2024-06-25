const mongoose = require('mongoose')

const UserInfromation = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    password : {
        type:String,
        required: true
    },

    

})

const UserDataSignUp = mongoose.model('users', UserInfromation )

module.exports = UserDataSignUp