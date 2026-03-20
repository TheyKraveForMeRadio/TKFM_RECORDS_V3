const Stripe = require("stripe")
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

module.exports = async (event) => {

  const body = JSON.parse(event.body || "{}")
  const { amount } = body

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [{
      price_data: {
        currency: "usd",
        product_data: {
          name: "TKFM Wallet Deposit"
        },
        unit_amount: amount * 100
      },
      quantity: 1
    }],
    success_url: "https://tkfmrecords.com/success",
    cancel_url: "https://tkfmrecords.com/cancel"
  })

  return {
    statusCode: 200,
    body: JSON.stringify({ url: session.url })
  }

}
