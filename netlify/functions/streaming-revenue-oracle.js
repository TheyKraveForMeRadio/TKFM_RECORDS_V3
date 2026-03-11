import { createClient } from "@supabase/supabase-js";
import { ethers } from "ethers";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

const wallet = new ethers.Wallet(
 process.env.DEPLOYER_PRIVATE_KEY,
 provider
);

const distributorABI = [
 "function depositRevenue() payable"
];

const distributor = new ethers.Contract(
 process.env.ROYALTY_DISTRIBUTOR_ADDRESS,
 distributorABI,
 wallet
);

export const handler = async () => {

 try {

  const { data: revenue } = await supabase
  .from("streaming_revenue_events")
  .select("*")
  .eq("processed", false);

  let totalRevenue = 0;

  for (const event of revenue) {

   totalRevenue += event.revenue_usd;

   await supabase
   .from("streaming_revenue_events")
   .update({ processed:true })
   .eq("id",event.id);

  }

  if(totalRevenue === 0){

   return {
    statusCode:200,
    body:JSON.stringify({status:"no revenue"})
   };

  }

  const tx = await distributor.depositRevenue({
   value: ethers.parseEther(totalRevenue.toString())
  });

  await tx.wait();

  return {
   statusCode:200,
   body:JSON.stringify({
    status:"revenue_distributed",
    amount:totalRevenue
   })
  };

 } catch(err){

  return{
   statusCode:500,
   body:JSON.stringify({error:err.message})
  };

 }

};
