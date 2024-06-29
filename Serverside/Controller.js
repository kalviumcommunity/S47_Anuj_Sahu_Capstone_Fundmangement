
const mongoose = require('mongoose')
const { UserDataSignUp, expertData,stockData } = require("./usermodel.js")
const signupSchema = require('./Validators/SignupValidate.js')
const crypto = require('crypto');
const jwt = require('jsonwebtoken')
const {sendOtp} = require('./Validators/emailOtp.js');
const JWToken  = require('./Validators/routeValidation.js')

exports.startDatabase = async () => {
    try {
        await mongoose.connect(process.env.URL, { dbName: process.env.DBNAME });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

exports.signup = async (req, res) => {
    try {
        const { value, error } = signupSchema.validate(req.body);
        console.log(value)

        if (error) {
            return res.status(400).send(error); // Return early if validation fails
        }

        const hashPassword = crypto.createHash('sha256').update(value.password).digest('base64');
        // console.log(hashPassword,"passsword hashed" )
        const newUser = await UserDataSignUp.create({
            userName: value.userName,
            email: value.email,
            password: hashPassword,
            payment:0,
            appointmentBook:0
        });
        console.log(newUser,'Anuj sahu NEW user')

        const JWToken = jwt.sign({ userName: value.username }, process.env.JWTKEY);
        console.log(JWToken);

        res.cookie('JWToken', JWToken);
        return res.status(200).send("Sign up Successfully");

    } catch (error) {
        console.error('Error in signup:', error);
        return res.status(500).send("Internal Server Error");
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const hashPasswordLogin = crypto.createHash('sha256').update(password).digest('base64');

        const user = await UserDataSignUp.findOne({ email: email, password: hashPasswordLogin });
        console.log(user);

        if (!user) {
            return res.status(401).send("Invalid UserName/Password");
        }
        const JWToken = jwt.sign({ userId: user.email }, process.env.JWTKEY);
        res.cookie('JWToken', JWToken, { httpOnly: true },{ expiresIn: '5h' });
        // res.status(200).send("Login Successfully")
        res.status(200).json({ token: JWToken });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.optSender = async (req, res) => {
    const { email } = req.body;

    try {
        const otp = await sendOtp(email); // Call your function to send OTP
        res.status(200).json({ otp });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: 'Failed to send OTP' });
    }
};

// app.listen(3000, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });



exports.otpSendOnEmail = async (req, res) => {
    const { email } = req.body;
    console.log(email)
    try {
        const otp = await sendOtp(email);
        console.log(otp);
        res.status(200).json({ message: 'OTP sent successfully' ,otp});
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: 'Failed to send OTP' });
    }
};

exports.expert = async (req, res) => {
    try {
        // Calling the JWT token validator middleware
        JWToken(req, res, async () => {
            const expertsdetails = await expertData.find();
            res.status(201).json(expertsdetails);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}


exports.homeRoute = (req, res) => {
    res.send("I am the home route")
}


exports.portfolio = async(req,res) =>{
    // console.log(req)
    const { email, stockDetails } = req.body;

    try {
        const user = await UserDataSignUp.findOne({email:email });
        if (!user) {
        return res.status(404).json({ error: 'User not found' });
        }
        const stock = await stockData.findOne({name:stockDetails.name});
        console.log(stock, "I am new one stock")
        user.portfolio.push(stock);
        await user.save();
        console.log("I am here 2")
        res.status(200).json({ message: 'Stock added to portfolio', user });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}


// exports.userProtofolio = async(req,res)=>{
    

// }


exports.stocksAdd = async(req,res) =>{
    console.log(req)
   
    try {
        const newStock = await stockData.create({
            name : req.body.name,
            ticker:req.body.ticker,
            beta:req.body.beta,
            debt_to_equity_ratio: req.body.debt_to_equity_ratio,
            market_cap: req.body.market_cap,
            current_price:req.body.current_price,
            annual_return_percentage:req.body.annual_return_percentage,
            dividend_yield:req.body.dividend_yield

        })
        console.log(newStock)
        res.send("Stock added succusfully")

        
    } catch (error) {
        console.log(error.message)
        
    }
    
}

exports.stockData = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    try {
        const stocks = await stockData.find().skip(skip).limit(limit);
        res.json(stocks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

