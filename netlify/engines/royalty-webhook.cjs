// 🔗 CONNECT EXTERNAL DISTRIBUTORS HERE
// Example: DistroKid / TuneCore webhook → TKFM

exports.handler = async (event) => {
  try {

    const payload = JSON.parse(event.body || "{}");

    // 🔄 NORMALIZE DATA (ADAPT PER PROVIDER)
    const catalog_id = payload.catalog_id || payload.track_id;
    const revenue = payload.revenue || payload.amount || 0;

    const fetch = require("node-fetch");

    await fetch(process.env.ROYALTY_INGEST_URL || "https://tkfm-records-v3.onrender.com/engine/royalty-ingest", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({
        catalog_id,
        source:"webhook",
        gross_revenue: revenue,
        period: payload.period || "unknown"
      })
    });

    return {
      statusCode:200,
      body:JSON.stringify({ success:true })
    };

  } catch(err){
    return {
      statusCode:500,
      body:JSON.stringify({ error: err.message })
    };
  }
};
