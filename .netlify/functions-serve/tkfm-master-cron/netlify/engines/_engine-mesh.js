import Redis from "ioredis"

const redis = new Redis(process.env.REDIS_URL)

/* publish event */

export async function broadcast(event,data){

await redis.publish(
"tkfm-engine-mesh",
JSON.stringify({
event,
data
})
)

}

/* subscribe */

export function subscribe(handler){

const sub = new Redis(process.env.REDIS_URL)

sub.subscribe("tkfm-engine-mesh")

sub.on("message",(channel,message)=>{

try{

const payload = JSON.parse(message)

handler(payload.event,payload.data)

}catch(err){
console.error("mesh error",err)
}

})

}
