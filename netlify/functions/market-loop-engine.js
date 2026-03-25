const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);

exports.handler = async () => {

  const keys = await redis.keys("book:buy:*");

  for(const key of keys){

    const catalog_id = key.split(":")[2];

    const topBuy = await redis.zrevrange(`book:buy:${catalog_id}`, 0, 0, "WITHSCORES");
    const topSell = await redis.zrange(`book:sell:${catalog_id}`, 0, 0, "WITHSCORES");

    if(!topBuy.length || !topSell.length) continue;

    const buyOrder = JSON.parse(topBuy[0]);
    const buyPrice = Number(topBuy[1]);

    const sellOrder = JSON.parse(topSell[0]);
    const sellPrice = Number(topSell[1]);

    if(buyPrice >= sellPrice){

      const tradeShares = Math.min(buyOrder.shares, sellOrder.shares);
      const tradePrice = sellPrice;

      await redis.hincrby(`holders:${catalog_id}`, buyOrder.user, tradeShares);
      await redis.hincrby(`holders:${catalog_id}`, sellOrder.user, -tradeShares);

      await redis.decrby(`wallet:${buyOrder.user}`, tradeShares * tradePrice);
      await redis.incrby(`wallet:${sellOrder.user}`, tradeShares * tradePrice);

      await redis.zrem(`book:buy:${catalog_id}`, topBuy[0]);
      await redis.zrem(`book:sell:${catalog_id}`, topSell[0]);

      await redis.lpush(`trades:${catalog_id}`, JSON.stringify({
        buyer: buyOrder.user,
        seller: sellOrder.user,
        price: tradePrice,
        shares: tradeShares,
        time: Date.now()
      }));

    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};
