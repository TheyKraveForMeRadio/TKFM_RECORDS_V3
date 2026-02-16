import { ethers } from 'ethers';
import TKFMTokenABI from '../../contracts/TKFMToken.json' with { type: "json" };

export async function handler(event) {
  const { artistAddress, tokenId, amount } = JSON.parse(event.body);
  if (!artistAddress || !tokenId || !amount) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing fields' }) };
  }
  try {
    const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL);
    const signer = new ethers.Wallet(process.env.OWNER_PRIVATE_KEY, provider);
    const contract = new ethers.Contract(process.env.TKFM_TOKEN_ADDRESS, TKFMTokenABI, signer);
    const tx = await contract.mint(artistAddress, tokenId, amount);
    await tx.wait();
    return { statusCode: 200, body: JSON.stringify({ success: true, txHash: tx.hash }) };
  } catch(e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
}
