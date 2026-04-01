const { client } = require("./_supabase");

exports.handler = async () => {

  const { data } = await client
    .from("waitlist")
    .select("email, created_at");

  const csv = [
    "email,created_at",
    ...(data || []).map(e => `${e.email},${e.created_at}`)
  ].join("\n");

  return {
    statusCode:200,
    headers:{
      "Content-Type":"text/csv",
      "Content-Disposition":"attachment; filename=waitlist.csv"
    },
    body: csv
  };

};
