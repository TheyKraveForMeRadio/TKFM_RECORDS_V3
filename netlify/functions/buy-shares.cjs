const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);

exports.handler = async (event) => {
  try {

    const body = JSON.parse(event.body || "{}");
    const { catalog_id, buyer, quantity } = body;

    if(!catalog_id || !buyer || !quantity){
      return {
        statusCode:400,
        body:JSON.stringify({ error:"missing fields" })
      };
    }

    const orders = await redis.zrange(`orderbook:${catalog_id}:sell`, 0, 0);

    if(!orders.length){
      return {
        statusCode:404,
        body:JSON.stringify({ error:"no liquidity" })
      };
    }

    const order = JSON.parse(orders[0]);

    if(order.quantity < quantity){
      return {
        statusCode:400,
        body:JSON.stringify({ error:"not enough shares in order" })
      };
    }

    const totalCost = order.price * quantity;

    const buyerBalance = Number(await redis.get(`wallet:${buyer}`) || 0);
    const sellerBalance = Number(await redis.get(`wallet:${order.user}`) || 0);

    if(buyerBalance < totalCost){
      return {
        statusCode:400,
        body:JSON.stringify({ error:"insufficient funds" })
      };
    }

    // 💳 SETTLEMENT
    await redis.set(`wallet:${buyer}`, buyerBalance - totalCost);
    await redis.set(`wallet:${order.user}`, sellerBalance + totalCost);

    // 📊 UPDATE HOLDERS
    await redis.hincrby(`shares:${catalog_id}:holders`, buyer, quantity);
    await redis.hincrby(`shares:${catalog_id}:holders`, order.user, -quantity);

    // 🔄 UPDATE ORDERBOOK
    order.quantity -= quantity;

    await redis.zrem(`orderbook:${catalog_id}:sell`, orders[0]);

    if(order.quantity > 0){
      await redis.zadd(`orderbook:${catalog_id}:sell`, order.price, JSON.stringify(order));
    }

    // 📈 TRADE LOG
    const trade = {
      type:"shares",
      buyer,
      seller:order.user,
      quantity,
      price:order.price,
      timestamp:Date.now()
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
