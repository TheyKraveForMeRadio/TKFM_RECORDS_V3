import { redis } from "./redis-cache.js"

const BASE = process.env.SELF_BASE_URL

async function processTrade(trade){

await fetch(BASE + "/.netlify/functions/matching-engine",{
method:"POST",
headers:{ "content-type":"application/json" },
body:JSON.stringify(trade)
})

}

export default async () => {

while(true){

const trade = await redis.lpop("trade_queue")

if(!trade) break

try{

await processTrade(JSON.parse(trade))

}catch(e){
console.log("trade processing error",e)
}

}

return {
statusCode:200,
body:"queue processed"
}

}
