const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);

exports.handler = async (event) => {

  const user = event.queryStringParameters.user;

  const history = await redis.lrange(`pnl_history:${user}`, 0, 50);

  return {
    statusCode:200,
    body:JSON.stringify({
      user,
      history: history.map(x => JSON.parse(x))
    })
  };

};
