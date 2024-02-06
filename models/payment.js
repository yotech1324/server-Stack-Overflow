import mongoose from 'mongoose'

const PaymentSchema = mongoose.Schema({
    razorpay_order_id: { type: String, required: true },
    razorpay_signature: { type: String, required: true },
    razorpay_payment_id: { type: String, required: true },
    User_name:{type:String , required: true},
    userId:{type:String, required: true}
})

export const Payment = mongoose.model("Payment", PaymentSchema )