
const express = require('express');

const bodyParser = require('body-parser');
const { startDatabase, homeRoute,signup, login,expert,otpSendOnEmail,auth,googlelogin  ,stocksAdd,stockData,optSender,portfolio} = require('./Controller.js'); 
const JWToken  = require('./Validators/routeValidation.js')
const {Payments,paymentstatus } = require('./Payment.js')
const cors = require('cors');
require('dotenv').config();
const Pfpcontroller = require('./ProfilePicController.js')
const { generateContent } = require('./LLM.js');


const app = express();
const port = process.env.port;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.get('/', homeRoute); // route for the home route.


app.post('/signup', signup); // Route for the SignUp

app.post('/login',login)  //Route for the Login

app.post('/otpSend',otpSendOnEmail)

app.post('/payments',Payments)

app.post('/paymentstatus',paymentstatus)

app.get('/appointment',expert )

app.post('/profileUpload',Pfpcontroller.profileUpload)

app.post('/stocks',stocksAdd)

app.get('/stocks',stockData)

app.post('/user/otp',optSender)

app.post('/users/add-to-portfolio',portfolio)

app.post('/ai', async (req, res) => {
    const { prompt } = req.body;
    try {
      const response = await generateContent(prompt);
      res.json({ response });
    } catch (error) {
      console.error('Error generating content:', error);
      res.status(500).json({ error: 'Internal server error' });
      }
    });

// app.get('/getProfilePic',Pfpcontroller.getProfilePic)

// async function run() {
//     const symbol = 'TCS'; // Replace with the symbol you want to fetch data for
//     const result = await fetchRiskData(symbol);
//     console.log(result);
// }
// async function anujj(){
//     console.log(await fetchRiskData('TCS'));

// } 
// anujj()



const startServer = () => {
  app.listen(3000, () => {
  console.log(`Server is running on port ${3000} 🚀🚀`);
});
};



startDatabase().then(() => startServer());


