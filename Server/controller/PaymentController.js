const Razorpay = require("razorpay");
const crypto = require("crypto");

const KEY_ID = "rzp_test_RB0WElnRLezVJ5";
const KEY_SECRET = "VLMCIrqKxRMNR9EcRcbL2UG8";

const instance = new Razorpay({
  key_id: KEY_ID,
  key_secret: KEY_SECRET,
});

const paymentController = {
  createOrder: (req, res) => {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    instance.orders.create(options, function (err, order) {
      if (err) {
        res.status(400).send({
          status: false,
          message: "unable to create the order",
        });
      } else {
        res.send({
          status: true,
          order,
        });
      }
    });
  },

  verifyPayment: (req, res) => {
    const { data } = req.body;

    const paymentData = data.order_id + "|" + data.payment_id;

    const generatedSingature = crypto
      .createHmac("sha256", KEY_SECRET)
      .update(paymentData.toString())
      .digest("hex");

    console.log(generatedSingature);

    if (data.signature === generatedSingature) {
      res.status(200).json({
        success: true,
        result: "payment done",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "payment not verified",
      });
    }
  },
};

module.exports = paymentController;
