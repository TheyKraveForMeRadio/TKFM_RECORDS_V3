const fetch = require("node-fetch");

exports.handler = async () => {

  // 🔥 SIMULATED STREAM REVENUE (REPLACE WITH REAL ORACLE)
  const catalog_id = "demo";
  const revenue = Math.random() * 10;

  await fetch(process.env.REVENUE_DISTRIBUTION_URL || "https://tkfm-records-v3.onrender.com/engine/share-revenue-distribution", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({
      catalog_id,
      revenue
    })
  });

  return {
    statusCode:200,
    body:JSON.stringify({
      success:true,
      revenue
    })
  };
};
