const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

const base = process.env.SELF_BASE_URL || "http://localhost:8888"

async function checkTable(table){

try{

const { error } = await supabase
.from(table)
.select("*")
.limit(1)

if(error) return {table,status:"error",error:error.message}

return {table,status:"ok"}

}catch(err){

return {table,status:"error",error:err.message}

}

}

async function checkEngine(engine){

try{

const res = await fetch(`${base}/.netlify/functions/api/${engine}`)
const data = await res.json()

return {engine,status:"ok",response:data}

}catch(err){

return {engine,status:"error",error:err.message}

}

}

exports.handler = async () => {

try{

const tables = [
"catalog_assets",
"order_book",
"trades",
"price_history",
"liquidity_pools",
"streaming_revenue"
]

const engines = [
"matching-engine",
"trade-settlement-engine",
"price-oracle-engine",
"music-index-engine",
"liquidity-ai-engine",
"amm-market-maker-engine",
"ai-trading-engine",
"trade-processor-engine",
"autonomous-market-engine"
]

let tableChecks = []
let engineChecks = []

for(const t of tables){

tableChecks.push(await checkTable(t))

}

for(const e of engines){

engineChecks.push(await checkEngine(e))

}

return {
statusCode:200,
body:JSON.stringify({
system:"TKFM",
status:"health-check-complete",
tables:tableChecks,
engines:engineChecks,
timestamp:new Date().toISOString()
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
