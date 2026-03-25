const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);

exports.handler = async (event) => {
  try {

    const body = JSON.parse(event.body || "{}");
    const { catalog_id, revenue } = body;

    if(!catalog_id || !revenue){
      return {
        statusCode:400,
        body:JSON.stringify({ error:"missing fields" })
      };
    }

    // 📊 GET HOLDERS
    const holders = await redis.hgetall(`shares:${catalog_id}:holders`);

    if(!holders || Object.keys(holders).length === 0){
      return {
        statusCode:404,
        body:JSON.stringify({ error:"no holders found" })
      };
    }

    const totalShares = Number(await redis.get(`shares:${catalog_id}:total`) || 0);

    if(totalShares === 0){
      return {
        statusCode:400,
        body:JSON.stringify({ error:"invalid total shares" })
      };
    }

    let payouts = [];

    for(const user in holders){

      const userShares = Number(holders[user]);

      if(userShares <= 0) continue;

      const percent = userShares / totalShares;

      const payout = revenue * percent;

      const currentBalance = Number(await redis.get(`wallet:${user}`) || 0);

      const newBalance = currentBalance + payout;

      await redis.set(`wallet:${user}`, newBalance);

      const record = {
        user,
        shares:userShares,
        percent,
        payout,
        timestamp:Date.now()
      };

      payouts.push(record);

      // 📈 LOG USER PNL
      await redis.lpush(`pnl_history:${user}`, JSON.stringify({
        type:"revenue",
        catalog_id,
        amount:payout,
        timestamp:Date.now()
      }));

    }

    // 🧾 GLOBAL LOG
    await redis.lpush(`revenue:${catalog_id}`, JSON.stringify({
      revenue,
      payouts,
      timestamp:Date.now()
    }));

    return {
      statusCode:200,
      body:JSON.stringify({
        success:true,
        totalDistributed:revenue,
        payouts
      })
    };

  } catch(err){
    return {
      statusCode:500,
      body:JSON.stringify({ error: err.message })
    };
  }
};
