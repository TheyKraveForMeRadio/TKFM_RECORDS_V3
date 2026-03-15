const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async function(event) {

 const catalog_id =
  event.queryStringParameters?.catalog_id || "song123";

 const { data, error } = await supabase
  .from("catalog_candles")
  .select("*")
  .eq("catalog_id", catalog_id)
  .order("timestamp", { ascending: true })
  .limit(100);

 if (error) {
  return {
   statusCode: 500,
   body: JSON.stringify({ error: error.message })
  };
 }

 return {
  statusCode: 200,
  body: JSON.stringify({ candles: data })
 };

};
