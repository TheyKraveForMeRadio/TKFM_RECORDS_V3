const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);

exports.handler = async (event) => {
  try {

    const user = event.queryStringParameters.user;

    if(!user){
      return {
        statusCode:400,
        body:JSON.stringify({ error:"user required" })
      };
    }

    // 💰 WALLET
    const balance = Number(await redis.get(`wallet:${user}`) || 0);

    // 📊 PNL HISTORY
    const pnlHistoryRaw = await redis.lrange(`pnl_history:${user}`, 0, 50);
    const pnlHistory = pnlHistoryRaw.map(x => JSON.parse(x));

    // 📈 HOLDINGS (SCAN ALL SHARE KEYS)
    const keys = await redis.keys("shares:*:holders");

    let holdings = [];

    for(const key of keys){

      const catalog_id = key.split(":")[1];

      const shares = Number(await redis.hget(key, user) || 0);

      if(shares > 0){

        const totalShares = Number(await redis.get(`shares:${catalog_id}:total`) || 1);

        const percent = shares / totalShares;

        holdings.push({
          catalog_id,
          shares,
          percent
        });

      }

    }

    // 📊 TOTAL VALUE (SIMPLE MODEL)
    let totalValue = balance;

    holdings.forEach(h => {
      totalValue += h.shares * 1; // placeholder price
    });

    return {
      statusCode:200,
      body:JSON.stringify({
        user,
        balance,
        totalValue,
        holdings,
        pnlHistory
      })
    };

  } catch(err){
    return {
      statusCode:500,
      body:JSON.stringify({ error: err.message })
    };
  }
};
