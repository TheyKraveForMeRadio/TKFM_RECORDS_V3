import { ethers } from 'ethers';
import TKFMTokenABI from '../../contracts/TKFMToken.json' with { type: "json" };

export async function handler(event) {
  const { email, creditType } = JSON.parse(event.body);
  if (!email || !creditType) return { statusCode: 400, body: JSON.stringify({ error: 'Missing fields' }) };

  try {
    const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL);
    const signer = new ethers.Wallet(process.env.OWNER_PRIVATE_KEY, provider);
    const contract = new ethers.Contract(process.env.TKFM_TOKEN_ADDRESS, TKFMTokenABI, signer);

    let tokenId;
    if (creditType === 'ai_drops_25') tokenId = 1;
    else if (creditType === 'sponsor_read_20pack') tokenId = 2;
    else return { statusCode: 400, body: JSON.stringify({ error: 'Unknown credit type' }) };

    const tx = await contract.mint(email, tokenId, 1);
    await tx.wait();

    return { statusCode: 200, body: JSON.stringify({ success: true, creditType, txHash: tx.hash }) };
  } catch(e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
}
