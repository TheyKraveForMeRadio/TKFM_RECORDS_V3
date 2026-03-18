const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

function spread(price){
const buy = Number((price * (1 - 0.02)).toFixed(2))
const sell = Number((price * (1 + 0.02)).toFixed(2))
return {buy,sell}
}

exports.handler = async ()=>{

try{

const { data: catalog } = await supabase
.from("catalog_assets")
.select("*")

const assets = catalog || []

let orders = []

assets.forEach(asset=>{

const prices = spread(asset.price)

orders.push({
catalog_id:asset.catalog_id,
side:"buy",
price:prices.buy,
quantity:100,
status:"open"
})

orders.push({
catalog_id:asset.catalog_id,
side:"sell",
price:prices.sell,
quantity:100,
status:"open"
})

})

const { data, error } = await supabase
.from("order_book")
.insert(orders)
.select()

if(error){
return {
statusCode:500,
body:JSON.stringify({
engine:"amm-market-maker",
error:error.message
})
}
}

return {
statusCode:200,
body:JSON.stringify({
engine:"amm-market-maker",
orders_created:orders.length,
rows_inserted:data.length
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
