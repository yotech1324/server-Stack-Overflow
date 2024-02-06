import express from 'express'

import { checkout, paymentVerification } from '../controllers/Payment.js'
// import auth from  '../middleware/auth.js'


const router = express.Router()

router.route('/checkout').post(checkout)

router.route('/paymentVerification').post(paymentVerification)

export default router
