const { client } = require("./_supabase");

exports.handler = async () => {

  try{

    const { data } = await client
      .from("trades")
      .select("*")
      .order("created_at",{ ascending:false })
      .limit(20);

    return {
      statusCode:200,
      headers:{ "Access-Control-Allow-Origin":"*" },
      body: JSON.stringify(data || [])
    };

  }catch(err){
    return {
      statusCode:200,
      body: JSON.stringify({ error: err.message })
    };
  }

};
