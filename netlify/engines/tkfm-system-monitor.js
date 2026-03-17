
const fs = require("fs")
const path = require("path")

exports.handler = async function(){

try{

const enginesDir =
path.join(__dirname)

const files =
fs.readdirSync(enginesDir)

let engines = []

files.forEach(f=>{

if(f.endsWith(".js")){

engines.push({
engine:f.replace(".js",""),
status:"loaded"
})

}

})

return {

statusCode:200,

body:JSON.stringify({

system:"TKFM ENGINE MESH",

engine_count:engines.length,

engines

})

}

}catch(err){

return{
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}

