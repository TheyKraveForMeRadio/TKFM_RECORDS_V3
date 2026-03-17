
const { createClient } = require("@supabase/supabase-js")

const supabase =
createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async function(){

try{

const { data:catalog } =
await supabase
.from("catalog")
.select("*")
.limit(50)

let orders = []

for(const song of catalog){

const base =
song.price || 1

orders.push({

catalog_id:song.catalog_id,
side:"buy",
price:base*0.98,
quantity:1

})

orders.push({

catalog_id:song.catalog_id,
side:"sell",
price:base*1.02,
quantity:1

})

}

return {

statusCode:200,

body:JSON.stringify({

engine:"liquidity-ai",

orders

})

}

}catch(err){

return{
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}

