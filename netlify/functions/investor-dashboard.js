const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async function(event){

 const investor_id = event.queryStringParameters.investor_id;

 const {data:portfolio} = await supabase
 .from("investor_portfolios")
 .select("*")
 .eq("investor_id",investor_id)
 .single();

 const {data:balances} = await supabase
 .from("investor_balances")
 .select("*")
 .eq("investor_id",investor_id);

 return{
  statusCode:200,
  body:JSON.stringify({
   portfolio,
   balances
  })
 };

};
