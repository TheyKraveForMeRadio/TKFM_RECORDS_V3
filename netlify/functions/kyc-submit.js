const { client } = require("./_supabase");

exports.handler = async (event) => {

  try{

    const { user, full_name, document_url } =
      JSON.parse(event.body);

    await client.from("kyc").insert([{
      username:user,
      full_name,
      document_url,
      status:"pending"
    }]);

    return {
      statusCode:200,
      body: JSON.stringify({ success:true })
    };

  }catch(err){
    return {
      statusCode:200,
      body: JSON.stringify({ error: err.message })
    };
  }

};
