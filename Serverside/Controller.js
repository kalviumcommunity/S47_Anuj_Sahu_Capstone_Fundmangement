const mongoose = require('mongoose')
const UserDataSignUp = require("./usermodel.js")
const cors = require('cors');


exports.startDatabase = async () => {
    try {
        await mongoose.connect(process.env.URL, {dbName:process.env.DBNAME});
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

exports.anuj = (req,res) =>{
    UserDataSignUp.find({})
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ error: err }));
}



// define the route or the Home Route.
exports.homeRoute = (req,res)=>{
    res.send("I am the home route")
}




// Defining the route for the add_Users.
exports.add_User = async (req,res)=>{
    const newUser = await UserDataSignUp.create(req.body);
    res.send(newUser)

}

