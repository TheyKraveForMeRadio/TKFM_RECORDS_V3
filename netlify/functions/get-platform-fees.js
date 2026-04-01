const { client } = require("./_supabase");

exports.handler = async () => {

  const { data } = await client
    .from("platform_fees")
    .select("*");

  return {
    statusCode:200,
    body: JSON.stringify(data || [])
  };

};
