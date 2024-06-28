
const mongoose = require('mongoose')
const { UserDataSignUp, expertData,stockData } = require("./usermodel.js")
const signupSchema = require('./Validators/SignupValidate.js')
const crypto = require('crypto');
const jwt = require('jsonwebtoken')
const sendOtp = require('./Validators/emailOtp.js');
const JWToken  = require('./Validators/routeValidation.js')
const axios = require('axios');
const request = require('request');
const jwt_decode = require('jwt-decode');
const { log } = require('console');
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

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
exports.googlelogin = (req, res) =>{
    const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZjZTExYWVjZjllYjE0MDI0YTQ0YmJmZDFiY2Y4YjMyYTEyMjg3ZmEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0OTY5Mzc2NDg2NTctbm1kZ25tcDMybG0zN3U1bnIxMXNsNmNyb3R0bHBuNmEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0OTY5Mzc2NDg2NTctbm1kZ25tcDMybG0zN3U1bnIxMXNsNmNyb3R0bHBuNmEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDIxMTYwNTg0NjQyNDkxMTU1MTYiLCJlbWFpbCI6ImFudWpzYWh1MTk1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3MTM4NDcyMjgsIm5hbWUiOiJBbnVqIFNhaHUiLCJnaXZlbl9uYW1lIjoiQW51aiIsImZhbWlseV9uYW1lIjoiU2FodSIsImlhdCI6MTcxMzg0NzUyOCwiZXhwIjoxNzEzODUxMTI4LCJqdGkiOiIwZTQ0NDJkZGJjZmZhOTI4ZTllZjNkNzVkYTdjZjMyMDdjYTE4MTMzIn0.aCM7NqZwDJrhoAapX-hlv3NR2L6HeAwFr9LNXV_hk_B5-93FDf1lX-NcMFHFcMlq7OJN7sDStbcIeH40msWTIz3xQRN_NxXkfLeMYOqw9qiC9qSnIMWsi6RX7022cSAUN0o-Ik-jrhJkHyBCik50sVMOuZDgki2lX8lCTDGYyITm_OwJHI5B_iEt7pZqMeSeJbqGC2S6UDL0zRuSG-GA8pjt7c_LxgVL_nk9YC3RD2783cH7JzrenDc7E9gZY3-BPjdJwzeTAvO5HiyiJrzWXeDuh4MmGHOgzSZTICGFtGdX-OLje4NgyLyO2yQPmPvIsja3W2Sofj4TMVH04XrJjA"; // Assuming credential contains the JWT token
    const decodedToken = jwt_decode.jwtDecode(token);
    res.send(decodedToken)

}

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
exports.auth = (req, res) => {
    res.send("you are authorize")
}


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

exports.stockData = async(req,res) =>{
        try {
            const stocks = await stockData.find();
            res.json(stocks);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    
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


exports.userProtofolio = async(req,res)=>{
    

}
exports.anuj = async (req, res) => {
    try {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TCS&apikey=${ALPHA_VANTAGE_API_KEY}`;
        const requestOptions = {
            url: url,
            json: true,
            headers: {
                'User-Agent': 'request'
            }
        };

        request.get(requestOptions, (err, response, data) => {
            if (err) {
                console.log('Error:', err);
                res.status(500).send('Internal Server Error');
            } else if (response.statusCode !== 200) {
                console.log('Status:', response.statusCode);
                res.status(response.statusCode).send('Failed to fetch data');
            } else {
                console.log(data);
                res.status(200).json(data);
            }
        });
    } catch (error) {
        console.error('Error fetching stock data:', error);
        res.status(500).send('Internal Server Error');
    }
}



exports.fetchRiskData = async(symbol)=> {
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    const url = `https://www.alphavantage.co/query?function=BETA&symbol=${symbol}&apikey=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        console.log(data);

        if (data['Meta Data']) {
            const beta = data['Meta Data']['Beta'];
            console.log(beta);
            return { success: true, beta };
        } else if (data['Error Message']) {
            return { success: false, error: data['Error Message'] };
        } else {
            return { success: false, error: 'An error occurred while fetching data.' };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}

exports.fetchRiskDataController = async (req, res) => {
    try {
        const symbol = req.query.symbol;
        if (!symbol) {
            return res.status(400).send('Symbol parameter is missing');
        }

        const result = await fetchRiskData(symbol);

        if (result.success) {
            res.status(200).json({ beta: result.beta });
        } else {
            res.status(500).json({ error: result.error });
        }
    } catch (error) {
        console.error('Error fetching risk data:', error);
        res.status(500).send('Internal Server Error');
    }
};

// fetchRiskData('TCS');