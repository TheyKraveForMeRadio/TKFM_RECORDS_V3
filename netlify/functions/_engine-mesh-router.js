
/*
TKFM DISTRIBUTED ENGINE MESH ROUTER

Routes engine requests across node clusters.
Works similar to Kubernetes service routing.
*/

const fetch = require("node-fetch")

/*
REGISTERED TKFM NODES
Add more nodes as your network grows
*/

const NODES = [

process.env.SELF_BASE_URL,

process.env.TKFM_NODE_US,
process.env.TKFM_NODE_EU,
process.env.TKFM_NODE_ASIA

].filter(Boolean)


/*
Simple round-robin router
*/

let pointer = 0

function getNode(){

if(NODES.length === 0){

throw new Error("No TKFM nodes registered")

}

const node = NODES[pointer]

pointer++

if(pointer >= NODES.length){
pointer = 0
}

return node

}


/*
Route engine execution to node
*/

async function route(engine,event){

const node = getNode()

const url =
node + "/.netlify/functions/api/" + engine

try{

const res = await fetch(url,{
method:event.httpMethod || "GET",
headers:{
"content-type":"application/json"
},
body:event.body
})

const data = await res.text()

return {
statusCode:200,
body:data
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({
error:"engine routing failed",
engine,
node,
message:err.message
})
}

}

}

module.exports = {
route
}

