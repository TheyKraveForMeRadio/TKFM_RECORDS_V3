const { client } = require("./_supabase");
const guard = require("./_adminGuard");

exports.handler = async (event) => {

  const auth = guard(event);
  if(!auth.ok){
    return {
      statusCode:401,
      body: JSON.stringify({ error: auth.error })
    };
  }

  try{

    const { data: fees } = await client.from("fees").select("*");
    const totalRevenue = (fees || []).reduce((s,f)=> s + Number(f.amount||0), 0);

    const { data: recent } = await client
      .from("fees")
      .select("*")
      .order("created_at",{ ascending:false })
      .limit(20);

    const { count: tradeCount } = await client
      .from("trades")
      .select("*",{ count:"exact", head:true });

    return {
      statusCode:200,
      headers:{ "Access-Control-Allow-Origin":"*" },
      body: JSON.stringify({
        totalRevenue,
        tradeCount,
        recentFees: recent || []
      })
    };

  }catch(err){
    return {
      statusCode:200,
      body: JSON.stringify({ error: err.message })
    };
  }

};
