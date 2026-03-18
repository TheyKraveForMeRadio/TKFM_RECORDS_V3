const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async () => {

try {

const { data } = await supabase
.from("price_history")
.select("*")

const prices = data || []

let latest = {}

prices.forEach(row => {

latest[row.catalog_id] = {
price: row.price,
volume: row.volume,
timestamp: row.created_at
}

})

return {
statusCode:200,
body:JSON.stringify({
engine:"price-oracle",
assets:Object.keys(latest).length,
prices:latest
})
}

} catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
