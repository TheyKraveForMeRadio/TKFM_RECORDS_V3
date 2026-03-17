const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async function(event){

  try{

    const body = JSON.parse(event.body || "{}")

    const {catalog_id,price,quantity,buyer,seller} = body

    await supabase
      .from("catalog_trades")
      .insert({
        catalog_id,
        price,
        quantity,
        buyer,
        seller,
        timestamp:new Date()
      })

    return {
      statusCode:200,
      body:JSON.stringify({
        status:"trade settled",
        catalog_id,
        price,
        quantity
      })
    }

  }catch(err){

    return {
      statusCode:500,
      body:JSON.stringify({error:err.message})
    }

  }

}
