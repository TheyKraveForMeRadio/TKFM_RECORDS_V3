const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);

exports.handler = async (event) => {

  const { user, catalog_id, shares } = JSON.parse(event.body);

  const asset = JSON.parse(await redis.get(`asset:${catalog_id}`));

  const cost = shares * asset.price_per_share;

  // deduct wallet
  await redis.decrby(`wallet:${user}`, cost);

  // add shares
  await redis.hincrby(`holders:${catalog_id}`, user, shares);

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      shares_bought: shares
    })
  };
};
