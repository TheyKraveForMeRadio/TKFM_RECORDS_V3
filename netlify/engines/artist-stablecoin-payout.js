import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js";
import { ethers } from "ethers";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

const provider = new ethers.JsonRpcProvider(
 process.env.RPC_URL
);

const wallet = new ethers.Wallet(
 process.env.DEPLOYER_PRIVATE_KEY,
 provider
);

const abi = [
 "function transfer(address to,uint256 amount) returns (bool)"
];

const contract = new ethers.Contract(
 process.env.STABLECOIN_ADDRESS,
 abi,
 wallet
);

export const handler = async()=>{

 const { data: payouts } = await supabase
 .from("artist_payout_queue")
 .select("*");

 for(const p of payouts){

  const tx = await contract.transfer(
   p.wallet,
   ethers.parseUnits(p.amount.toString(),18)
  );

  await tx.wait();

 }

 return{
  statusCode:200,
  body:JSON.stringify({
   status:"artist payouts complete"
  })
 };

};
