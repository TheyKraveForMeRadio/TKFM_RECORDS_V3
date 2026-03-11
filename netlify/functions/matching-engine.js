const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function matchCatalog(catalog_id){

 const {data:buys} = await supabase
 .from("order_book")
 .select("*")
 .eq("catalog_id",catalog_id)
 .eq("side","buy")
 .eq("status","open")
 .order("price",{ascending:false});

 const {data:sells} = await supabase
 .from("order_book")
 .select("*")
 .eq("catalog_id",catalog_id)
 .eq("side","sell")
 .eq("status","open")
 .order("price",{ascending:true});

 for(const buy of buys){

  for(const sell of sells){

   if(sell.price <= buy.price){

    const tradeAmount = Math.min(buy.amount,sell.amount);

    const price = (buy.price + sell.price)/2;

    await supabase.from("trades").insert({
     catalog_id,
     price,
     amount:tradeAmount,
     buyer:buy.investor_id,
     seller:sell.investor_id,
     timestamp:new Date().toISOString()
    });

    await supabase
    .from("order_book")
    .update({status:"filled"})
    .eq("id",buy.id);

    await supabase
    .from("order_book")
    .update({status:"filled"})
    .eq("id",sell.id);

    return;
   }

  }

 }

}

exports.handler = async function(){

 const {data:catalogs} = await supabase
 .from("catalogs")
 .select("id");

 for(const catalog of catalogs){

  await matchCatalog(catalog.id);

 }

 return{
  statusCode:200,
  body:JSON.stringify({status:"matching_complete"})
 };

};
