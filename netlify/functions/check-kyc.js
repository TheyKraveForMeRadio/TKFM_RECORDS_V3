const { client } = require("./_supabase");

exports.handler = async (event) => {

  const user = event.queryStringParameters.user;

  const { data } = await client
    .from("kyc")
    .select("status")
    .eq("username", user)
    .single();

  return {
    statusCode:200,
    body: JSON.stringify({ verified: data?.status === "approved" })
  };

};
