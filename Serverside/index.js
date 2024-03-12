const express = require('express');
const UserController = require('./Controller.js')
require('dotenv').config();

const app = express();
const port = process.env.port

app.get('/',UserController.homeRoute) // route for the home route.

app.post('/add_User', UserController.add_User)


app.listen(port , ()=>{
    console.log(`Server is started🚀🚀 at ${port}`)
})



