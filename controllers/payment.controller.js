const Stripe = require("stripe");
const PaymentInfo = require("../models/payment.model");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const paymentDetails = async (req, res) => {
  const { amount, currency, source, description } = req.body;
  if (!amount || !currency || !source || !description) {
    return res.status(400).json({
      success: false,
      message:
        "Please provide all required fields which includes amount, currency, source, description",
    });
  }

  try {
    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: source,
      description,
      confirm: true, // Confirming the payment as true
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never", // Disallow redirects for automatic payment methods
      },
    });
    console.log("paymentIntent>>>>>>", paymentIntent);

    const transactionDetails = {
      paymentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
      description: paymentIntent.description,
      created: new Date(paymentIntent.created * 1000), // Convert from seconds to milliseconds
    };

    const details = await PaymentInfo.create({
      paymentId: transactionDetails.paymentId,
      amount: transactionDetails.amount,
      currency: transactionDetails.currency,
      status: transactionDetails.status,
      description: transactionDetails.description,
      created: transactionDetails.created,
    });
    console.log("details of the payment>>>>>>>>>", details);

    res.status(200).json({
      success: true,
      paymentId: paymentIntent.id,
      payment_status: paymentIntent.status,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getPaymentDetails = async (req, res) => {
  try {
    const { paymentId } = req.params;
    console.log("using params");
    
    if (!paymentId) {
      return res.status(400).json({
        success: false,
        message: "Payment ID is required",
      });
    }
    const paymentDetails = await PaymentInfo.findOne({
      where: {
        paymentId: paymentId,
      },
      attributes: ["amount", "currency", "status", "description", "created"],
    });
    if (!paymentDetails) {
      return res.status(404).json({
        success: false,
        message: "PaymentDetails not found",
      });
    }
    res.status(200).json({
      success: true,
      paymentDetails: paymentDetails.dataValues,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  paymentDetails,
  getPaymentDetails,
};
