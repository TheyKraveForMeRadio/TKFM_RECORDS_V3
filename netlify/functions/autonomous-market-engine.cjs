const fetch = require("node-fetch")

const base = process.env.SELF_BASE_URL || "http://localhost:8888"

async function cycle(){

const engines = [
"ai-trading-engine",
"amm-market-maker-engine",
"matching-engine",
"trade-settlement-engine",
"price-oracle-engine",
"music-index-engine"
]

for(const e of engines){

try{

const res = await fetch(`${base}/.netlify/functions/api/${e}`)
const data = await res.json()

console.log("engine:",e,data)

}catch(err){

console.log("engine error:",e,err.message)

}

}

}

exports.handler = async ()=>{

try{

await cycle()

return {
statusCode:200,
body:JSON.stringify({
engine:"autonomous-market",
status:"market cycle executed"
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
