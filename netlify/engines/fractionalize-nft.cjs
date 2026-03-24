const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);

exports.handler = async (event) => {
  try {

    const body = JSON.parse(event.body || "{}");
    const { catalog_id, token_id, total_shares, owner } = body;

    if(!catalog_id || !token_id || !total_shares || !owner){
      return {
        statusCode:400,
        body:JSON.stringify({ error:"missing fields" })
      };
    }

    // 🧠 STORE TOTAL SHARES
    await redis.set(`shares:${catalog_id}:total`, total_shares);

    // 👑 OWNER GETS 100% INITIALLY
    await redis.hset(`shares:${catalog_id}:holders`, owner, total_shares);

    // 📈 INITIAL MARKET LIST (SELL 10% AUTO)
    const initialSell = Math.floor(total_shares * 0.1);

    await redis.zadd(`orderbook:${catalog_id}:sell`, 1, JSON.stringify({
      user: owner,
      price: 1,
      quantity: initialSell,
      token_id,
      type: "shares"
    }));

    return {
      statusCode:200,
      body:JSON.stringify({
        success:true,
        total_shares,
        initialSell
      })
    };

  } catch(err){
    return {
      statusCode:500,
      body:JSON.stringify({ error: err.message })
    };
  }
};
