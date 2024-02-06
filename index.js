import express  from "express";
import mongoose from "mongoose";
import cors from 'cors'
import Razorpay from 'razorpay'

import dotenv from 'dotenv';


import userRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'
import paymentRoutes from './routes/payment.js'

const app = express();
dotenv.config(); 

app.use(express.json({limit:"30mb", extended:true}))
app.use(express.urlencoded({limit:"30mb", extended: true}))
app.use(cors())

app.get('/',(req, res) =>{
    res.send("this is a stack overflow clone api")
})

app.use('/user',userRoutes)
app.use('/questions',questionRoutes)
app.use('/answer',answerRoutes)
app.use('/payment', paymentRoutes)
  


app.get('/payment/getkey',(req, res) =>
res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);


// intgrating razorpay 
 export const instance = new Razorpay({
    key_id : process.env.RAZORPAY_API_KEY,
    key_secret : process.env.RAZORPAY_API_SECRET
 })

 



const DATABASE_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000

mongoose.connect(DATABASE_URL, {useNewUrlParser:true , useUnifiedTopology:true})
.then(() => app.listen(PORT, () => {console.log(`server is running on PORT ${PORT}`)}))
.catch((err) => console.log(err.message))
 
      
      