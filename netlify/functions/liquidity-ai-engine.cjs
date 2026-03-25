const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async () => {

try {

const { data } = await supabase
.from("catalog_assets")
.select("*")

const catalog = data || []

let liquidity = []

catalog.forEach(asset => {

liquidity.push({
catalog_id: asset.catalog_id,
price: asset.price,
market_cap: asset.market_cap,
recommended_liquidity: asset.market_cap * 0.02
})

})

return {
statusCode:200,
body:JSON.stringify({
engine:"liquidity-ai",
assets:liquidity.length,
liquidity
})
}

} catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
