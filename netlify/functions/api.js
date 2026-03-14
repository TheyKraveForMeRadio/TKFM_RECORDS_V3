import fs from "fs"
import path from "path"
import url from "url"

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const enginesDir = path.join(__dirname,"../engines")

export const handler = async (event,context) => {

try{

const endpoint = event.path
.replace("/.netlify/functions/api/api/","")
.replace("/.netlify/functions/api/","")
.split("?")[0]

const file = path.join(enginesDir, endpoint + ".js")

if(!fs.existsSync(file)){
return {
statusCode:404,
body:JSON.stringify({
error:"engine not found",
endpoint
})
}
}

const engine = await import(file)

if(!engine.handler){
return {
statusCode:500,
body:JSON.stringify({
error:"handler missing"
})
}
}

return await engine.handler(event,context)

}catch(err){

return {
statusCode:500,
body:JSON.stringify({
error:err.message
})
}

}

}
