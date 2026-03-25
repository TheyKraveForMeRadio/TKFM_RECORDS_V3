const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async function () {

  try {

    const { data, error } = await supabase
      .from("catalog_trades")
      .select("catalog_id, price, quantity, timestamp")
      .order("timestamp",{ascending:false})
      .limit(200)

    if(error) throw error

    const flows = {}

    data.forEach(t=>{

      const value = t.price * t.quantity

      if(!flows[t.catalog_id]){

        flows[t.catalog_id] = {
          buy_volume:0,
          trade_count:0
        }

      }

      flows[t.catalog_id].buy_volume += value
      flows[t.catalog_id].trade_count++

    })

    const ranking =
      Object.entries(flows)
      .map(([catalog,stats])=>({
        catalog_id:catalog,
        volume:stats.buy_volume,
        trades:stats.trade_count
      }))
      .sort((a,b)=>b.volume-a.volume)
      .slice(0,10)

    return {
      statusCode:200,
      body:JSON.stringify({

        engine:"TKFM ORDER FLOW",

        top_flows:ranking

      })
    }

  } catch(err){

    return {
      statusCode:500,
      body:JSON.stringify({error:err.message})
    }

  }

}
