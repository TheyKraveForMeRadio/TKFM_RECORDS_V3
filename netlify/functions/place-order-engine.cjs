const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);

exports.handler = async (event) => {

  const { user, catalog_id, side, price, shares } = JSON.parse(event.body);

  const order = JSON.stringify({
    user,
    shares,
    price,
    timestamp: Date.now()
  });

  if(side === "buy"){
    await redis.zadd(`book:buy:${catalog_id}`, price, order);
  } else {
    await redis.zadd(`book:sell:${catalog_id}`, price, order);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};
