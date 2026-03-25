const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);

exports.handler = async (event) => {

  const catalog_id = event.queryStringParameters.catalog_id;

  const trades = await redis.lrange(`trades:${catalog_id}`, 0, 50);

  return {
    statusCode:200,
    body:JSON.stringify({
      trades: trades.map(x => JSON.parse(x))
    })
  };

};
