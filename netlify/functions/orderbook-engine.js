import { redis } from "./redis-cache.js"

export default async (req) => {

const { catalog_id, type, price, shares } = JSON.parse(req.body || "{}")

if(!catalog_id || !type) return {statusCode:400, body:"invalid order"}

const bookKey = "orderbook:"+catalog_id

let book = await redis.get(bookKey)

if(!book){
book = { bids:[], asks:[] }
}else{
book = JSON.parse(book)
}

const order = {
price:Number(price),
shares:Number(shares),
timestamp:Date.now()
}

if(type === "buy"){

book.bids.push(order)
book.bids.sort((a,b)=>b.price-a.price)

}

if(type === "sell"){

book.asks.push(order)
book.asks.sort((a,b)=>a.price-b.price)

}

await redis.set(bookKey,JSON.stringify(book))

return {
statusCode:200,
body:JSON.stringify(book)
}

}
