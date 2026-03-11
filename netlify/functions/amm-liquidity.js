import { ethers } from "ethers";

const provider =
 new ethers.JsonRpcProvider(
  process.env.MAINNET_RPC_URL
 );

const wallet =
 new ethers.Wallet(
  process.env.PRIVATE_KEY,
  provider
 );

export async function handler(){

 return {

  statusCode:200,
  body:JSON.stringify({

   liquidity:true

  })

 };

}
