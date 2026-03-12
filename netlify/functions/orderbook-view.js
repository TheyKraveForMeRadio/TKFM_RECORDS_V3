import { redis } from "./redis-cache.js"

export default async (req) => {

const id = req.queryStringParameters.catalog_id

if(!id) return {statusCode:400,body:"missing catalog"}

let book = await redis.get("orderbook:"+id)

if(!book){
book={bids:[],asks:[]}
}else{
book=JSON.parse(book)
}

return{
statusCode:200,
body:JSON.stringify(book)
}

}
