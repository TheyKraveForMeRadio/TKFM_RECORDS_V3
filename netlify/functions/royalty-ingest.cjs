const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);

exports.handler = async (event) => {
  try {

    const body = JSON.parse(event.body || "{}");

    const {
      catalog_id,
      source,        // distro / label / manual
      period,        // "2026-03"
      gross_revenue, // total payout
      currency,      // USD
      breakdown      // optional per-platform
    } = body;

    if(!catalog_id || !gross_revenue){
      return {
        statusCode:400,
        body:JSON.stringify({ error:"missing fields" })
      };
    }

    const record = {
      catalog_id,
      source: source || "manual",
      period: period || new Date().toISOString().slice(0,7),
      gross_revenue: Number(gross_revenue),
      currency: currency || "USD",
      breakdown: breakdown || {},
      timestamp: Date.now()
    };

    // 🧾 STORE RAW REPORT
    await redis.lpush(`royalty_reports:${catalog_id}`, JSON.stringify(record));

    // 💰 TRIGGER DISTRIBUTION
    const fetch = require("node-fetch");

    await fetch(process.env.REVENUE_DISTRIBUTION_URL || "https://tkfm-records-v3.onrender.com/engine/share-revenue-distribution", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({
        catalog_id,
        revenue: record.gross_revenue
      })
    });

    return {
      statusCode:200,
      body:JSON.stringify({
        success:true,
        record
      })
    };

  } catch(err){
    return {
      statusCode:500,
      body:JSON.stringify({ error: err.message })
    };
  }
};
