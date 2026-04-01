const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {

  try{

    const { user } = JSON.parse(event.body);

    const session = await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      mode:"subscription",
      line_items:[{
        price: process.env.STRIPE_VIP_PRICE_ID,
        quantity:1
      }],
      success_url: "https://www.tkfmrecords.com/vip-success.html?user=" + user,
      cancel_url: "https://www.tkfmrecords.com/tkfm-hub.html"
    });

    return {
      statusCode:200,
      body: JSON.stringify({ url: session.url })
    };

  }catch(err){
    return {
      statusCode:200,
      body: JSON.stringify({ error: err.message })
    };
  }

};
