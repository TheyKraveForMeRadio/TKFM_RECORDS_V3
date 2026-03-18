const fetch = require("node-fetch")

const base = process.env.SELF_BASE_URL || "http://localhost:8888"

async function run(engine){

const url = `${base}/.netlify/functions/api/${engine}`

try{

const res = await fetch(url)
const data = await res.json()

console.log(engine,data)

return data

}catch(err){

console.error(engine,err.message)

return null

}

}

exports.handler = async ()=>{

try{

await run("ai-trading-engine")
await run("amm-market-maker-engine")
await run("matching-engine")
await run("trade-settlement-engine")
await run("price-oracle-engine")
await run("music-index-engine")

return {
statusCode:200,
body:JSON.stringify({
engine:"trade-processor",
status:"cycle complete"
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
