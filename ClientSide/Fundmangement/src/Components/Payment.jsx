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
            "key": "rzp_test_tzk3VRcYS0ZRsO",
            amount,
            currency,
            "name": "Morpheous Funds",
            "description": "Please pay the amount to book a meeting with our expert.",
            "image": "https://example.com/your_logo",
            "order_id": res.data.id,
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
        <div>
            <button className={styles.heading} onClick={paymentHandler}>Pay Now</button>
        </div>
    );
}

export default Payment;