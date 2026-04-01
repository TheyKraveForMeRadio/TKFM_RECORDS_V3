const { client } = require("./_supabase");

exports.handler = async (event) => {

  const { id } = JSON.parse(event.body);

  await client
    .from("kyc")
    .update({ status:"approved" })
    .eq("id", id);

  return {
    statusCode:200,
    body: JSON.stringify({ approved:true })
  };

};
