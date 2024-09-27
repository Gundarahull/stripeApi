const express=require('express')
const { paymentPage, paymentDetails, getPaymentDetails } = require('../controllers/payment.controller')
const router=express.Router()


router.post('/create',paymentDetails)
router.get('/:paymentId',getPaymentDetails)



module.exports=router