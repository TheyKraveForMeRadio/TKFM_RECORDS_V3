import { redis } from "./redis-cache.js"

export default async (req) => {

const { catalog_id, action, amount } = JSON.parse(req.body || "{}")

if(!catalog_id){
return {statusCode:400,body:"missing catalog"}
}

const key="liquidity:"+catalog_id

let pool=await redis.get(key)

if(!pool){

pool={
cash:10000,
shares:1000
}

}else{

pool=JSON.parse(pool)

}

if(action==="buy"){

pool.cash+=Number(amount)
pool.shares-=Number(amount)/pool.price

}

if(action==="sell"){

pool.cash-=Number(amount)
pool.shares+=Number(amount)/pool.price

}

pool.price=pool.cash/pool.shares

await redis.set(key,JSON.stringify(pool))

return{
statusCode:200,
body:JSON.stringify(pool)
}

}
