const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.port

app.get('/', (req,res) => {
    res.json({
        message: 'Server working is ready for the capstone'
    })
});


app.get('/getApi',(req,res)=>{
    res.json({message:'I have used the get API'})
})

app.listen(port , ()=>{
    console.log(`Server is started🚀🚀 at ${port}`)
})

