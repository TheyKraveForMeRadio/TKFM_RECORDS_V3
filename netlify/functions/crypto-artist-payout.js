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

export async function handler(event){

 const body = JSON.parse(event.body);

 const tx =
 await wallet.sendTransaction({

  to:body.wallet,

  value:
  ethers.parseEther(
   body.amount.toString()
  )

 });

 await tx.wait();

 return {

  statusCode:200,

  body:JSON.stringify({

   tx:tx.hash

  })

 };

}
