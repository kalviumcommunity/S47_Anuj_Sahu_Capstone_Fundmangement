const mongoose = require('mongoose')
const UserDataSignUp = require("./usermodel.js")
const signupSchema  = require('./Validators/SignupValidate.js')
const crypto = require('crypto');



exports.startDatabase = async () => {
    try {
        await mongoose.connect(process.env.URL, {dbName:process.env.DBNAME});
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

exports.signup = async(req,res) =>{
    try{
        const {value,error} = signupSchema.validate(req.body)

        if(error){
                res.send(error.message)
            }
            
        const hashPassword = crypto.createHash('sha256').update(value.password).digest('base64')
        const newUser = UserDataSignUp.create({
            userName:value.userName,
            email:value.email,
            password:hashPassword
        })
        res.status(201).send('Account Created Successfully')
    
    
    }
    catch(error){
        res.status(500).send("Internal Server Error");
    }

    }
    


// define the route or the Home Route.
exports.homeRoute = (req,res)=>{
    res.send("I am the home route")
}







