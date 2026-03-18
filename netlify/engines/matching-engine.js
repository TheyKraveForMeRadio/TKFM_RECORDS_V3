const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async ()=>{

try{

const { data: orders } = await supabase
.from("order_book")
.select("*")
.eq("status","open")

const book = orders || []

let trades = []

for(let i=0;i<book.length;i++){

const buy = book[i]

if(buy.side !== "buy") continue

const sell = book.find(o =>
o.catalog_id === buy.catalog_id &&
o.side === "sell" &&
o.price <= buy.price &&
o.status === "open"
)

if(!sell) continue

const quantity = Math.min(buy.quantity,sell.quantity)
const price = sell.price

trades.push({
catalog_id:buy.catalog_id,
price,
quantity,
buyer:buy.id,
seller:sell.id
})

await supabase
.from("order_book")
.update({status:"filled"})
.in("id",[buy.id,sell.id])

}

if(trades.length>0){

await supabase
.from("trades")
.insert(trades)

}

return {
statusCode:200,
body:JSON.stringify({
engine:"matching-engine",
trades_executed:trades.length
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
