const { client } = require("./_supabase");

exports.handler = async () => {

  const { data } = await client
    .from("withdrawals")
    .select("*")
    .order("created_at",{ ascending:false });

  return {
    statusCode:200,
    body: JSON.stringify(data || [])
  };

};
