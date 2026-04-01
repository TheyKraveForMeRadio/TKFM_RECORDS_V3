const { client } = require("./_supabase");

exports.handler = async (event) => {

  const user = event.queryStringParameters.user;

  await client
    .from("users")
    .update({
      vip:true,
      vip_expires: new Date(Date.now() + 30*24*60*60*1000)
    })
    .eq("username", user);

  return {
    statusCode:302,
    headers:{ Location:"/user-dashboard.html" }
  };

};
