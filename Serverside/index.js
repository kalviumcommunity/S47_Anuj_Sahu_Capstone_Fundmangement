const express = require('express');
const bodyParser = require('body-parser');
const { startDatabase, homeRoute, anuj, signup, login,expert,auth,googlelogin } = require('./Controller.js'); 
const JWToken  = require('./Validators/routeValidation.js')
const {Payments,paymentstatus } = require('./Payment.js')
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = process.env.port;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
// app.use('/appointment', JWToken);
// app.get('/prac',anuj)

app.get('/', homeRoute); // route for the home route.


app.post('/signup', signup); // Route for the SignUp

app.post('/login',login)  //Route for the Login

app.post('/payments',Payments)

app.post('/paymentstatus',paymentstatus)

app.get('/appointment',expert )

app.get('/auth',auth)

app.get('/googlelogin',googlelogin)

const startServer = () => {
        app.listen(port, () => {
        console.log(`Server is running on port ${port} 🚀🚀`);
    });
};

startDatabase().then(() => startServer());


