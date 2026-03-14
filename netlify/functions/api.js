import fs from "fs"
import path from "path"
import { createRequire } from "module"

const require = createRequire(import.meta.url)

/* engines directory */

const enginesDir = path.join(__dirname,"../engines")

/* engine cache */

const engineCache = {}

export const handler = async (event,context)=>{

try{

const endpoint = event.path
.replace("/.netlify/functions/api/","")
.replace("/.netlify/functions/","")
.split("?")[0]

const file = path.join(enginesDir,endpoint+".js")

if(!fs.existsSync(file)){
return{
statusCode:404,
body:JSON.stringify({
error:"engine not found",
endpoint,
path:file
})
}
}

/* load engine */

if(!engineCache[file]){
engineCache[file] = require(file)
}

const engine = engineCache[file]

if(!engine.handler){
return{
statusCode:500,
body:JSON.stringify({
error:"handler missing"
})
}
}

return await engine.handler(event,context)

}catch(err){

return{
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
