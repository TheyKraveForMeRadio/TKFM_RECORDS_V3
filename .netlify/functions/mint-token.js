import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL);
const wallet = new ethers.Wallet(process.env.ETH_PRIVATE_KEY, provider);
const abi = JSON.parse(process.env.TKFM_TOKEN_ABI);
const tokenAddress = process.env.TKFM_TOKEN_ADDRESS;
const contract = new ethers.Contract(tokenAddress, abi, wallet);

export async function handler(event, context){
  const { email, tokenId, amount } = JSON.parse(event.body);
  const tx = await contract.mint(wallet.address, tokenId, amount);
  return { statusCode:200, body: JSON.stringify({ success:true, txHash: tx.hash }) };
}
