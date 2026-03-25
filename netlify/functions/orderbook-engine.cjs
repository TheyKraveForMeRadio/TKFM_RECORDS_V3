const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);

exports.handler = async (event) => {

  const { catalog_id } = event.queryStringParameters;

  const buys = await redis.zrevrange(`book:buy:${catalog_id}`, 0, -1, "WITHSCORES");
  const sells = await redis.zrange(`book:sell:${catalog_id}`, 0, -1, "WITHSCORES");

  return {
    statusCode: 200,
    body: JSON.stringify({
      buy_orders: buys,
      sell_orders: sells
    })
  };
};
