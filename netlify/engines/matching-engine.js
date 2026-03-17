const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async function () {

  try {

    const { data: bids } = await supabase
      .from("catalog_orders")
      .select("*")
      .eq("side","buy")
      .order("price",{ascending:false})

    const { data: asks } = await supabase
      .from("catalog_orders")
      .select("*")
      .eq("side","sell")
      .order("price",{ascending:true})

    const trades=[]

    for(const bid of bids){

      const ask = asks.find(a=>a.price<=bid.price)

      if(!ask) continue

      const qty = Math.min(bid.quantity,ask.quantity)

      trades.push({
        catalog_id:bid.catalog_id,
        price:ask.price,
        quantity:qty
      })

    }

    return {
      statusCode:200,
      body:JSON.stringify({
        engine:"matching-engine",
        trades
      })
    }

  } catch(err){

    return {
      statusCode:500,
      body:JSON.stringify({error:err.message})
    }

  }

}
