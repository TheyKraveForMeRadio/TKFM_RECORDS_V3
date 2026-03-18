const fs = require("fs")
const path = require("path")

const engines = {}
const enginesDir = path.join(__dirname, "../engines")

function loadEngines(){

const files = fs.readdirSync(enginesDir)

files.forEach(file => {

if(!file.endsWith(".js")) return

try{

const name = file.replace(".js","")
const engine = require(path.join(enginesDir,file))

engines[name] = async (event,context)=>{

try{

const result = await engine.handler(event,context)

if(!result){
return {
statusCode:200,
body:JSON.stringify({status:"ok"})
}
}

if(!result.body){
result.body = JSON.stringify(result)
}

return result

}catch(err){

console.log("ENGINE ERROR:",name,err.message)

return {
statusCode:200,
body:JSON.stringify({
engine:name,
error:err.message,
safe:true
})
}

}

}

console.log("Loaded engine:",name)

}catch(err){

console.log("Skipped engine:",file)

}

})

}

loadEngines()

exports.handler = async (event,context)=>{

const engineName = event.path.split("/").pop()

const engine = engines[engineName]

if(!engine){

return {
statusCode:404,
body:JSON.stringify({
error:"engine not found",
engine:engineName
})
}

}

return engine(event,context)

}
