const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);

exports.handler = async (event) => {

  const { catalog_id, total_shares } = JSON.parse(event.body);

  const price_per_share = 1; // starting price

  await redis.set(`asset:${catalog_id}`, JSON.stringify({
    catalog_id,
    total_shares,
    price_per_share
  }));

  // give creator full ownership initially
  await redis.hset(`holders:${catalog_id}`, {
    creator: total_shares
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      catalog_id,
      total_shares
    })
  };
};
