import bus from "./_event-bus.js";
import { ethers } from "ethers";

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

export const handler = async(event)=>{

 try{

  const body = JSON.parse(event.body);

  const { to, amount } = body;

  const tx = await contract.transfer(
   to,
   ethers.parseUnits(amount.toString(),18)
  );

  await tx.wait();

  return{
   statusCode:200,
   body:JSON.stringify({
    status:"payment_sent",
    amount
   })
  };

 }catch(err){

  return{
   statusCode:500,
   body:JSON.stringify({error:err.message})
  };

 }

};
