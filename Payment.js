const Razorpay = require('razorpay')
const crypto = require('crypto')
require('dotenv').config();

exports.Payments = async(req,res) =>{
    try{
        const razorpay = new Razorpay({
            key_id:process.env.RAZORPAY_KEY,
            key_secret:process.env.RAZORPAY_SECRET 
        }
        )
        const orderDetails = req.body;
        const placedOrder = await razorpay.orders.create(orderDetails)
        if(!orderDetails){
            res.status(404).send("Order Details did not found")
        }

        res.send(placedOrder)
    }catch(err){
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
}


exports.paymentstatus =  async(req,res) =>{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;
  
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET );
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if(digest !== razorpay_signature){
        return res.status(400).json({msg:"Transaction is not legit!"});
    }
  
    res.json({
        msg : "Success",
        orderId : razorpay_order_id,
        paymentId : razorpay_payment_id,
       })
    }