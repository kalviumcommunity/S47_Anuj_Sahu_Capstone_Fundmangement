const mongoose = require('mongoose')
const { UserDataSignUp, expertData } = require("./usermodel.js")
const signupSchema = require('./Validators/SignupValidate.js')
const crypto = require('crypto');
const jwt = require('jsonwebtoken')
const sendOtp = require('./Validators/emailOtp.js');
const axios = require('axios');
const request = require('request');
const jwt_decode = require('jwt-decode');
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
        const { value, error } = signupSchema.validate(req.body)
        
        if(error){
            res.send(error)
        }

        const hashPassword = crypto.createHash('sha256').update(value.password).digest('base64')
        const newUser = UserDataSignUp.create({
            userName: value.userName,
            email: value.email,
            password: hashPassword
        })
        const JWToken = jwt.sign(value.userName, process.env.JWTKEY)
        console.log(JWToken);

        res.cookie('JWToken', JWToken);
        res.status(200).send("Sign up Successfully")

    }
    catch (error) {
        return res.status(500).send("Internal Server Error");
    }

}

exports.googlelogin = (req, res) =>{
    const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZjZTExYWVjZjllYjE0MDI0YTQ0YmJmZDFiY2Y4YjMyYTEyMjg3ZmEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0OTY5Mzc2NDg2NTctbm1kZ25tcDMybG0zN3U1bnIxMXNsNmNyb3R0bHBuNmEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0OTY5Mzc2NDg2NTctbm1kZ25tcDMybG0zN3U1bnIxMXNsNmNyb3R0bHBuNmEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDIxMTYwNTg0NjQyNDkxMTU1MTYiLCJlbWFpbCI6ImFudWpzYWh1MTk1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3MTM4NDcyMjgsIm5hbWUiOiJBbnVqIFNhaHUiLCJnaXZlbl9uYW1lIjoiQW51aiIsImZhbWlseV9uYW1lIjoiU2FodSIsImlhdCI6MTcxMzg0NzUyOCwiZXhwIjoxNzEzODUxMTI4LCJqdGkiOiIwZTQ0NDJkZGJjZmZhOTI4ZTllZjNkNzVkYTdjZjMyMDdjYTE4MTMzIn0.aCM7NqZwDJrhoAapX-hlv3NR2L6HeAwFr9LNXV_hk_B5-93FDf1lX-NcMFHFcMlq7OJN7sDStbcIeH40msWTIz3xQRN_NxXkfLeMYOqw9qiC9qSnIMWsi6RX7022cSAUN0o-Ik-jrhJkHyBCik50sVMOuZDgki2lX8lCTDGYyITm_OwJHI5B_iEt7pZqMeSeJbqGC2S6UDL0zRuSG-GA8pjt7c_LxgVL_nk9YC3RD2783cH7JzrenDc7E9gZY3-BPjdJwzeTAvO5HiyiJrzWXeDuh4MmGHOgzSZTICGFtGdX-OLje4NgyLyO2yQPmPvIsja3W2Sofj4TMVH04XrJjA"; // Assuming credential contains the JWT token
    const decodedToken = jwt_decode.jwtDecode(token);
    res.send(decodedToken)

}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password);

        const hashPasswordLogin = crypto.createHash('sha256').update(password).digest('base64');

        const user = await UserDataSignUp.findOne({ userName: username, password: hashPasswordLogin });
        console.log(user);

        if (!user) {
            return res.status(401).send("Invalid UserName/Password");
        }

        const JWToken = jwt.sign({ userId: user._id }, process.env.JWTKEY);
        console.log(JWToken);

        // Send the JWT token in the response
        res.status(200).json({ token: JWToken });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};


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

exports.expert = async (req, res) => {
    try {
        const expertsdetails = await expertData.find();
        res.status(201).json(expertsdetails);
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error");
    }
}

exports.homeRoute = (req, res) => {
    res.send("I am the home route")
}
exports.auth = (req, res) => {
    res.send("you are authorize")
}



async function fetchRiskData(symbol) {
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    const url = `https://www.alphavantage.co/query?function=BETA&symbol=${symbol}&apikey=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data['Meta Data']) {
            const beta = data['Meta Data']['Beta'];
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
