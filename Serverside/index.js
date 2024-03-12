const express = require('express');
const bodyParser = require('body-parser');
const { startDatabase, homeRoute, add_User, anuj } = require('./Controller.js'); 
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.port;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get('/prac',anuj)

app.get('/', homeRoute); // route for the home route.


// app.post('/add_User', add_User); // Route for the SignUp

const startServer = () => {
        app.listen(port, () => {
        console.log(`Server is running on port ${port} 🚀🚀`);
    });
};

startDatabase().then(() => startServer());


