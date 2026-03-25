const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);

exports.handler = async (event) => {

  const { user, catalog_id, shares } = JSON.parse(event.body);

  const asset = JSON.parse(await redis.get(`asset:${catalog_id}`));

  const value = shares * asset.price_per_share;

  await redis.incrby(`wallet:${user}`, value);

  await redis.hincrby(`holders:${catalog_id}`, user, -shares);

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      shares_sold: shares
    })
  };
};
