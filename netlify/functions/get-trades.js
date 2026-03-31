const { client, withTimeout } = require("./_supabase");
const res = require("./_response");

exports.handler = async (event) => {

  if(event.httpMethod === "OPTIONS") return res.preflight();

  try{

    const query = client
      .from("trades")
      .select("*")
      .order("created_at",{ ascending:false })
      .limit(30);

    const result = await withTimeout(query);

    return res.ok(result.data || []);

  }catch(err){
    console.log("TRADES ERROR:", err.message);
    return res.error(err);
  }

};
