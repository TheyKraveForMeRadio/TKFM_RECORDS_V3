
const fs = require("fs")
const path = require("path")

const clusters = [
"engines",
"engines-exchange",
"engines-economy",
"engines-oracles",
"engines-creator",
"engines-risk",
"engines-payments",
"engines-ai"
]

const engineRegistry = {}

clusters.forEach(cluster=>{

const dir =
path.join(__dirname,"../",cluster)

if(!fs.existsSync(dir)) return

fs.readdirSync(dir).forEach(file=>{

if(file.endsWith(".js")){

const name = file.replace(".js","")

try{

engineRegistry[name] =
require("../"+cluster+"/"+name)

}catch(err){

console.log("engine load fail",name,err.message)

}

}

})

})

exports.handler = async function(event){

try{

const engineName =
event.path.split("/api/")[1]

const engine =
engineRegistry[engineName]

if(!engine){

return{
statusCode:404,
body:JSON.stringify({
error:"engine not found",
engine:engineName
})
}

}

return engine.handler(event)

}catch(err){

return{
statusCode:500,
body:JSON.stringify({
error:err.message
})
}

}

}

