const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);

// 🔗 UTILITY — CAN BE USED BY OTHER ENGINES
async function linkTokenToMarket(catalog_id, token_id, wallet){

  await redis.set(`catalog:${catalog_id}:token_id`, token_id);
  await redis.set(`token:${token_id}:owner`, wallet);

  await redis.zadd(`orderbook:${catalog_id}:sell`, 1, JSON.stringify({
    user: wallet,
    price: 1,
    quantity: 1,
    token_id
  }));

}

module.exports = { linkTokenToMarket };
