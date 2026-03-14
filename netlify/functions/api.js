import fs from "fs"
import path from "path"

const enginesDir = new URL("../engines/", import.meta.url)

/* engine cache */
const engineCache = {}

export const handler = async (event,context)=>{

try{

const endpoint = event.path
.replace("/.netlify/functions/api/","")
.replace("/.netlify/functions/","")
.split("?")[0]

const file = path.join(
enginesDir.pathname,
endpoint + ".js"
)

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

/* cached dynamic import */

if(!engineCache[file]){
engineCache[file] = await import(file)
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
