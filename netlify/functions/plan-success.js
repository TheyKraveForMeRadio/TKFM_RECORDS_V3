const { client } = require("./_supabase");

exports.handler = async (event) => {

  const { user, plan } = event.queryStringParameters;

  await client
    .from("users")
    .update({
      plan,
      vip: plan !== "basic"
    })
    .eq("username", user);

  return {
    statusCode:302,
    headers:{ Location:"/user-dashboard.html" }
  };

};
