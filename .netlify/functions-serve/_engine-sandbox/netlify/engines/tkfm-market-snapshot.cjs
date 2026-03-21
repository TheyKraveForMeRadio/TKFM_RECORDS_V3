
const fs = require("fs")
const path = require("path")

exports.handler = async function(){

try{

const snapshot = {
timestamp: Date.now(),
market_cap: Math.floor(Math.random()*100000000),
trade_volume: Math.floor(Math.random()*10000),
index_value: Math.random()*1000,
top_songs: [
{catalog_id:"song123",price:5.2},
{catalog_id:"song456",price:3.9},
{catalog_id:"song789",price:7.4}
]
}

const file =
path.join("/tmp","tkfm-market.json")

fs.writeFileSync(file,JSON.stringify(snapshot))

return {
statusCode:200,
body:JSON.stringify({
status:"snapshot generated",
snapshot
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}

