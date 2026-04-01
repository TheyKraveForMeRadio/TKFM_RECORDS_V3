const { client } = require("./_supabase");

exports.handler = async (event) => {

  const user = event.queryStringParameters.user;

  const { data } = await client
    .from("users")
    .select("vip,vip_expires")
    .eq("username", user)
    .single();

  return {
    statusCode:200,
    body: JSON.stringify(data)
  };

};
