
/*
TKFM SUPERNODE ENGINE
Coordinates distributed engine clusters
Allows multiple servers to act as one network
*/

const fetch = require("node-fetch")

const nodes = [
process.env.SELF_BASE_URL
]

async function ping(node){

try{

const res =
await fetch(node + "/.netlify/functions/api/economy-status")

return await res.json()

}catch(e){

return {
node,
status:"offline"
}

}

}

exports.handler = async function(){

try{

const results = []

for(const node of nodes){

const status = await ping(node)

results.push({
node,
status
})

}

return {

statusCode:200,

body:JSON.stringify({

network:"TKFM SUPERNODE NETWORK",

nodes:results,

timestamp:new Date()

})

}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}

