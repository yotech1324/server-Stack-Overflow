import { instance } from '../index.js'
import crypto from 'crypto'
import { Payment } from '../models/payment.js'

var name = 0;
var userId = 0;
export const checkout = async (req, res) => {

    const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR",
        notes: [req.body.name, req.body.userId]
    };
 name = req.body.name;
userId = req.body.userId;
console.log(name)
// const User_paying = localStorage.setItem({name:req.body.name,userId:req.body.userId})
// localStorage.setItem('User_paying', JSON.stringify( req.body ))
// localStorage.setItem('User_paying', JSON.stringify(req.body));

    const order = await instance.orders.create(options)
console.log(order)

    res.status(200).json({
        success: true,
        order,
    });
}



export const paymentVerification = async (req, res) => {
    
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
console.log(req.body.name)

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET).update(body.toString()).digest('hex');

const isAuthenticated = expectedSignature === razorpay_signature;

if(isAuthenticated){
    //database adding process

await Payment.create({
    razorpay_order_id, 
    razorpay_payment_id,
     razorpay_signature,
     User_name:name,
     userId:userId,
})
          
res.redirect('/')
    res.redirect(`https://stack-overflow-premium.netlify.app/paymentsuccess?reference=${razorpay_payment_id}`);
}else{
  
    res.status(400).json({
        success: false,
    });
}
}
