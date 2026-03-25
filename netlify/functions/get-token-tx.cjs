const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);

exports.handler = async (event) => {

  const token_id = event.queryStringParameters.token_id;

  const tx = await redis.get(`token:${token_id}:last_tx`);

  return {
    statusCode:200,
    body:JSON.stringify({
      token_id,
      tx
    })
  };

};
