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

const contractAddress =
 process.env.ROYALTY_VAULT;

const abi = [
 "function distribute(address,uint256)"
];

const contract =
 new ethers.Contract(
  contractAddress,
  abi,
  wallet
 );

export async function handler(event){

 const body = JSON.parse(event.body);

 const tx =
 await contract.distribute(

  body.wallet,
  body.amount

 );

 await tx.wait();

 return {

  statusCode:200,
  body:JSON.stringify({

   tx:tx.hash

  })

 };

}
