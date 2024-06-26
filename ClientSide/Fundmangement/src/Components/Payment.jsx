
import React from 'react';
import styles from './Payment.module.css';
import axios from 'axios'
import Cookies from 'js-cookie'

function Payment() {
    const amount = 1000*100
    const currency = "INR"
    const min = 10000000;
    const max = 99999999;
    const receiptId = `${Math.floor(min + Math.random() * (max - min + 1))}`;


    const paymentHandler =async (e) =>{
        const res = await axios.post("http://localhost:3000/payments",{amount,currency,receipt : receiptId})
        const userName = Cookies.get('userName');
        console.log(userName)
        var options = {
            "key": "rzp_test_tzk3VRcYS0ZRsO", // Enter the Key ID generated from the Dashboard
            amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency,
            "name": "Morpheous Funds", //your business name
            "description": "Please pay the amount to book a meeting with our expert.",
            "image": "https://example.com/your_logo",
            "order_id": res.data.id, //This is a sample Order ID. Pass the id obtained in the response of Step 1
            "handler": async function (response){
                const body = {
                    ...response,
                    userName
                }

                const validated = await axios.post("http://localhost:3000/paymentstatus",body)
                console.log(validated.data)
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response){
        });

        rzp1.open();
        e.preventDefault();
    }
    return (
        <div className={styles.paymentContainer}>
            <h1 className={styles.heading} onClick={paymentHandler}>Pay Now</h1>
        </div>
    );
}

export default Payment;
