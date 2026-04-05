const { client } = require("./_supabase");

exports.handler = async (event) => {

  const user = event.queryStringParameters.user;

  const { data } = await client
    .from("notifications")
    .select("*")
    .eq("username", user)
    .order("created_at",{ ascending:false })
    .limit(20);

  return {
    statusCode:200,
    body: JSON.stringify(data || [])
  };

};
