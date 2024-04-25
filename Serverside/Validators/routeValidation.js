// Validators/routeValidation.js

const jwt = require('jsonwebtoken');

const JWToken = (req, res, next) => {
    try {
        const token = req.headers.authorization; 
        

        if (!token) {
            return res.status(401).send("Access Denied");
        }

        try {
            const decoded = jwt.verify(token, process.env.JWTKEY);
            // console.log(decoded);

            next();
        } catch (error) {
            console.error(error); 
        }

    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.error(error); // Log the error for debugging purposes
    }
};

module.exports = JWToken;
