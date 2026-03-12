import { redis } from "./redis-cache.js"

const BASE = process.env.SELF_BASE_URL

export default async (req) => {

const { catalog_id } = JSON.parse(req.body || "{}")

const key = "orderbook:"+catalog_id

let book = await redis.get(key)

if(!book) return {statusCode:200,body:"no orders"}

book = JSON.parse(book)

const trades=[]

while(book.bids.length && book.asks.length){

const bid = book.bids[0]
const ask = book.asks[0]

if(bid.price < ask.price) break

const shares = Math.min(bid.shares, ask.shares)

const trade = {
catalog_id,
price:ask.price,
shares,
timestamp:Date.now()
}

trades.push(trade)

bid.shares -= shares
ask.shares -= shares

if(bid.shares<=0) book.bids.shift()
if(ask.shares<=0) book.asks.shift()

await fetch(BASE + "/.netlify/functions/tkfm-event-bus",{
method:"POST",
headers:{ "content-type":"application/json" },
body:JSON.stringify({
type:"trade_executed",
catalog_id,
price:trade.price,
shares
})
})

}

await redis.set(key,JSON.stringify(book))

return {
statusCode:200,
body:JSON.stringify({trades,book})
}

}
