
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
    payment:{
        type:Number,
        default:0
    },
    appointmentBook:{
        type:Number,
        default:0
    }

})

const UserDataSignUp = mongoose.model('users', UserInfromation )


const ProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        required: true
    }
});

const expertData = mongoose.model('expertsdetails', ProfileSchema);



module.exports ={ UserDataSignUp,expertData}