import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
TKFM DERIVATIVES MARGIN ENGINE

Handles:

margin requirements
leverage control
forced liquidation
*/

const MARGIN_RATIO = 0.2

async function checkMargin(){

 const { data: positions } = await supabase
  .from("music_derivatives_positions")
  .select("*")

 if(!positions) return 0

 let liquidations = 0

 for(const p of positions){

  const positionValue =
   Number(p.contract_size || 0) *
   Number(p.entry_price || 0)

  const requiredMargin =
   positionValue * MARGIN_RATIO

  const currentMargin =
   Number(p.margin_balance || 0)

  if(currentMargin < requiredMargin){

   /* LIQUIDATE POSITION */

   await supabase
    .from("music_derivatives_liquidations")
    .insert({
      position_id:p.id,
      user_id:p.user_id,
      contract_id:p.contract_id,
      value:positionValue,
      created_at:new Date().toISOString()
    })

   await supabase
    .from("music_derivatives_positions")
    .update({
      liquidated:true,
      liquidated_at:new Date().toISOString()
    })
    .eq("id",p.id)

   liquidations++

  }

 }

 return liquidations
}

export const handler = async () => {

 try{

  const count = await checkMargin()

  return{
   statusCode:200,
   body:JSON.stringify({
    status:"margin checked",
    liquidations:count
   })
  }

 }catch(err){

  return{
   statusCode:500,
   body:JSON.stringify({error:err.message})
  }

 }

}
