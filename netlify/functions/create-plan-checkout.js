const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {

  try{

    const { user, plan } = JSON.parse(event.body);

    const priceMap = {
      basic: process.env.STRIPE_BASIC_PRICE,
      pro: process.env.STRIPE_PRO_PRICE,
      elite: process.env.STRIPE_ELITE_PRICE
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      mode:"subscription",
      line_items:[{
        price: priceMap[plan],
        quantity:1
      }],
      success_url: `https://www.tkfmrecords.com/plan-success.html?user=${user}&plan=${plan}`,
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
