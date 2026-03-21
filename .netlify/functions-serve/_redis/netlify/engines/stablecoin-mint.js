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
 "function mint(address to,uint256 amount)"
];

const contract = new ethers.Contract(
 process.env.STABLECOIN_ADDRESS,
 abi,
 wallet
);

export const handler = async(event)=>{

 const body = JSON.parse(event.body);

 const { investor, amount } = body;

 const tx = await contract.mint(
  investor,
  ethers.parseUnits(amount.toString(),18)
 );

 await tx.wait();

 return{
  statusCode:200,
  body:JSON.stringify({
   status:"stablecoin minted",
   amount
  })
 };

};
