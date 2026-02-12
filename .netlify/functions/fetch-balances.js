import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL);
const wallet = new ethers.Wallet(process.env.ETH_PRIVATE_KEY, provider);
const abi = JSON.parse(process.env.TKFM_TOKEN_ABI);
const tokenAddress = process.env.TKFM_TOKEN_ADDRESS;
const contract = new ethers.Contract(tokenAddress, abi, provider);

export async function handler(event, context){
  const { email } = JSON.parse(event.body);
  const balances = {};
  balances.AI_DROP_25 = (await contract.balanceOf(wallet.address, 1)).toString();
  balances.SPONSOR_READ_20PACK = (await contract.balanceOf(wallet.address, 2)).toString();
  balances.RADIO_PLAY = (await contract.balanceOf(wallet.address, 3)).toString();
  return { statusCode:200, body: JSON.stringify(balances) };
}
