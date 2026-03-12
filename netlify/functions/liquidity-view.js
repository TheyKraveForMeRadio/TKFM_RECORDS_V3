import { redis } from "./redis-cache.js"

export default async (req) => {

const id=req.queryStringParameters.catalog_id

let pool=await redis.get("liquidity:"+id)

if(!pool){

pool={
cash:10000,
shares:1000,
price:10
}

}else{

pool=JSON.parse(pool)

}

return{
statusCode:200,
body:JSON.stringify(pool)
}

}
