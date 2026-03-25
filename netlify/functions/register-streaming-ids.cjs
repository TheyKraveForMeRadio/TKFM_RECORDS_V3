const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);

exports.handler = async (event) => {

  const body = JSON.parse(event.body || "{}");

  const { catalog_id, spotify_id, apple_id } = body;

  if(!catalog_id){
    return {
      statusCode:400,
      body:JSON.stringify({ error:"catalog_id required" })
    };
  }

  if(spotify_id){
    await redis.set(`catalog:${catalog_id}:spotify`, spotify_id);
  }

  if(apple_id){
    await redis.set(`catalog:${catalog_id}:apple`, apple_id);
  }

  await redis.sadd("active:catalogs", catalog_id);

  return {
    statusCode:200,
    body:JSON.stringify({
      success:true,
      catalog_id,
      spotify_id,
      apple_id
    })
  };

};
