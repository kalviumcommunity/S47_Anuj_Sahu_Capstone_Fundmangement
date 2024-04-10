
import React from 'react';
import styles from './Payment.module.css';
import axios from 'axios'

function Payment() {
    const amount = 4000
    const currency = "INR"
    const receiptId = "123456"


    const paymentHandler =async (e) =>{
        const res = await axios.post("http://localhost:3000/payments",{amount,currency,receipt : receiptId})
        console.log(res)
        var options = {
            "key": "rzp_test_tzk3VRcYS0ZRsO", // Enter the Key ID generated from the Dashboard
            amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency,
            "name": "InstruRentals", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": res.data.id, //This is a sample Order ID. Pass the id obtained in the response of Step 1
            "handler": async function (response){
                const body = {
                    ...response,
                }

                const validated = await axios.post("http://localhost:3000/paymentstatus",body)
                console.log(validated.data)
            },
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                "name": "Anuj", //your customer's name
                "email": "Officialanuj004@gmail.com", 

                "contact": "8817577592"  //Provide the customer's phone number for better conversion rates 
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
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
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
