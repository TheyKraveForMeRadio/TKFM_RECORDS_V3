const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async function(){

  try{

    const { data } = await supabase
      .from("catalog_trades")
      .select("catalog_id,price")
      .order("timestamp",{ascending:false})

    const prices={}

    data.forEach(t=>{
      if(!prices[t.catalog_id]){
        prices[t.catalog_id]=t.price
      }
    })

    return {
      statusCode:200,
      body:JSON.stringify({
        engine:"price-oracle",
        prices
      })
    }

  }catch(err){

    return {
      statusCode:500,
      body:JSON.stringify({error:err.message})
    }

  }

}
