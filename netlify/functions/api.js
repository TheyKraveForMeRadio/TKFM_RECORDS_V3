import fs from "fs"
import path from "path"

/* Netlify runtime working directory */

const enginesDir =
path.join(process.cwd(),"netlify","engines")

/* engine cache */

const cache = {}

export const handler = async (event,context)=>{

try{

const endpoint = event.path
.replace("/.netlify/functions/api/","")
.replace("/.netlify/functions/","")
.split("?")[0]

const file =
path.join(enginesDir,endpoint+".js")

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

/* dynamic ESM load */

if(!cache[file]){

cache[file] =
await import("file://"+file)

}

const engine = cache[file]

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
body:JSON.stringify({
error:err.message
})
}

}

}
