const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async function(event){

 const catalog_id = event.queryStringParameters.catalog_id;

 const {data} = await supabase
 .from("price_history")
 .select("*")
 .eq("catalog_id",catalog_id)
 .order("timestamp",{ascending:false})
 .limit(100);

 return{
  statusCode:200,
  body:JSON.stringify(data)
 };

};
