import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
MUSIC DERIVATIVES CLEARING CORPORATION (MDCC)

Clears and settles:

royalty futures
catalog options
music swaps

Acts as the counterparty to every derivatives trade.
*/

async function settleContracts(){

 const { data: contracts, error } = await supabase
  .from("music_derivatives_contracts")
  .select("*")
  .eq("settled", false)

 if(error) throw error
 if(!contracts || contracts.length === 0) return 0

 let settledCount = 0

 for(const contract of contracts){

  const contractValue = Number(contract.contract_value || 0)
  const settlementPrice = Number(contract.settlement_price || 0)

  const payout = contractValue * settlementPrice

  await supabase
   .from("derivatives_settlements")
   .insert({
     contract_id: contract.id,
     buyer: contract.buyer,
     seller: contract.seller,
     payout,
     created_at: new Date().toISOString()
   })

  await supabase
   .from("music_derivatives_contracts")
   .update({
     settled: true,
     settled_at: new Date().toISOString()
   })
   .eq("id", contract.id)

  settledCount++

 }

 return settledCount
}

export const handler = async () => {

 try{

  const count = await settleContracts()

  return {
   statusCode:200,
   body:JSON.stringify({
    status:"derivatives cleared",
    settled_contracts: count
   })
  }

 }catch(err){

  return {
   statusCode:500,
   body:JSON.stringify({error:err.message})
  }

 }

}
