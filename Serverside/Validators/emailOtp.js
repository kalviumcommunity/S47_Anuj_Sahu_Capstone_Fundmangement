const otplib = require('otplib');
const nodemailer = require('nodemailer');
// const client = require('./redisClient.js')

async function sendOtp(email) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'morpheousfunds@gmail.com',
            pass: process.env.PassKey
        }
    });

    const secret = "anuj@2004";

    // Generate OTP using otplib
    const otp = otplib.authenticator.generate(secret);

    const mailOptions = {
        from: 'morpheousfunds@gmail.com',
        to: email,
        subject: 'Your OTP',
        text: `Your Otp is ${otp}`
    };

    // client.setex(email, 3000, otp)
    const otpsent = await transporter.sendMail(mailOptions);
}

module.exports = sendOtp;
