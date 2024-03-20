const mongoose = require('mongoose')
const UserDataSignUp = require("./usermodel.js")
const signupSchema  = require('./Validators/SignupValidate.js')
const crypto = require('crypto');
const jwt = require('jsonwebtoken')



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
                return res.send(error.message)
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
        return res.status(500).send("Internal Server Error");
    }

    }


exports.login = async(req,res) =>{
    try{
        const {userName,password} = req.body
        
        const hashPasswordLogin = crypto.createHash('sha256').update(password).digest('base64')

        const user = await UserDataSignUp.findOne({userName: userName,password: hashPasswordLogin})

        if(!user){
            return res.send("Invalid UserName/Password")

        }

        const JWToken = jwt.sign({userId:user._id},process.env.JWTKEY)
        console.log(JWToken, user.userName)

        // res.cookie('JWToken', JWToken, { httpOnly: true },{ expiresIn: '5h' });
        res.status(200).send("Login Successfully")
        

    }
    catch (error){
        res.status(500).send("Internal Server Error")
    }
}


    


// define the route or the Home Route.
exports.homeRoute = (req,res)=>{
    res.send("I am the home route")
}







