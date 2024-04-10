const jwt = require('jsonwebtoken')

exports.JWTtoken = (req,res,next)=>{
    try{
        const token = req.cookies.JWToken

        if(!token){
            return res.status(401).send("Access Denied")
        }

        try {
            const decoded = jwt.verify(token, process.env.JWTKEY);
            console.log(decoded)

            next();
        } catch (error) {
            res.status(400).send('Invalid Token');
        }



    }catch(error){
        res.send("Internal Server Error")
    }

}