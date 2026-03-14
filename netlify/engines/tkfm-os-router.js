import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler = async(event)=>{

 try{

  const body = JSON.parse(event.body);

  const { command, payload } = body;

  switch(command){

   case "register_artist":
    return {
     statusCode:200,
     body:JSON.stringify({
      route:"artist_identity",
      payload
     })
    };

   case "mint_catalog":
    return {
     statusCode:200,
     body:JSON.stringify({
      route:"catalog_mint_engine",
      payload
     })
    };

   case "trade_catalog":
    return {
     statusCode:200,
     body:JSON.stringify({
      route:"exchange_engine",
      payload
     })
    };

   case "issue_license":
    return {
     statusCode:200,
     body:JSON.stringify({
      route:"licensing_engine",
      payload
     })
    };

   default:

    return{
     statusCode:400,
     body:JSON.stringify({
      error:"unknown command"
     })
    };

  }

 }catch(err){

  return{
   statusCode:500,
   body:JSON.stringify({
    error:err.message
   })
  };

 }

};
