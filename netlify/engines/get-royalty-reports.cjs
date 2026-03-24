const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);

exports.handler = async (event) => {

  const catalog_id = event.queryStringParameters.catalog_id;

  const reports = await redis.lrange(`royalty_reports:${catalog_id}`, 0, 20);

  return {
    statusCode:200,
    body:JSON.stringify({
      catalog_id,
      reports: reports.map(x => JSON.parse(x))
    })
  };

};
