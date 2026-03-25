
const fs = require("fs")
const path = require("path")

exports.handler = async function(){

try{

const file =
path.join("/tmp","tkfm-market.json")

if(!fs.existsSync(file)){

return {
statusCode:200,
body:JSON.stringify({})
}

}

const data =
fs.readFileSync(file)

return {
statusCode:200,
headers:{
"Cache-Control":"public,max-age=30"
},
body:data
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}

