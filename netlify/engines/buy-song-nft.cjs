const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);

exports.handler = async (event) => {
  try {

    const body = JSON.parse(event.body || "{}");
    const { catalog_id, buyer, price } = body;

    if(!catalog_id || !buyer){
      return {
        statusCode:400,
        body:JSON.stringify({ error:"missing fields" })
      };
    }

    // 📥 GET LOWEST SELL ORDER
    const orders = await redis.zrange(`orderbook:${catalog_id}:sell`, 0, 0);

    if(!orders || orders.length === 0){
      return {
        statusCode:404,
        body:JSON.stringify({ error:"no sellers available" })
      };
    }

    const sellOrder = JSON.parse(orders[0]);

    // 💰 PRICE CHECK
    if(price < sellOrder.price){
      return {
        statusCode:400,
        body:JSON.stringify({ error:"price too low" })
      };
    }

    const seller = sellOrder.user;
    const token_id = sellOrder.token_id;

    // 💳 WALLET TRANSFER (INTERNAL LEDGER)
    const buyerBalance = await redis.get(`wallet:${buyer}`) || 0;
    const sellerBalance = await redis.get(`wallet:${seller}`) || 0;

    if(Number(buyerBalance) < sellOrder.price){
      return {
        statusCode:400,
        body:JSON.stringify({ error:"insufficient balance" })
      };
    }

    await redis.set(`wallet:${buyer}`, Number(buyerBalance) - sellOrder.price);
    await redis.set(`wallet:${seller}`, Number(sellerBalance) + sellOrder.price);

    // 🔄 TRANSFER OWNERSHIP
    await redis.set(`token:${token_id}:owner`, buyer);

    // 📊 HOLDERS UPDATE
    await redis.hset(`holders:${catalog_id}`, buyer, 1);
    await redis.hdel(`holders:${catalog_id}`, seller);

    // ❌ REMOVE SELL ORDER
    await redis.zrem(`orderbook:${catalog_id}:sell`, orders[0]);

    // 📈 TRADE HISTORY
    const trade = {
      buyer,
      seller,
      price: sellOrder.price,
      token_id,
      timestamp: Date.now()
    };

    await redis.lpush(`trades:${catalog_id}`, JSON.stringify(trade));

    return {
      statusCode:200,
      body:JSON.stringify({
        success:true,
        trade
      })
    };

  } catch(err){
    return {
      statusCode:500,
      body:JSON.stringify({ error: err.message })
    };
  }
};
