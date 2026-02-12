import { ethers } from 'ethers';
import TKFMTokenABI from '../../contracts/TKFMToken.json' assert { type: "json" };

export async function handler(event) {
  const { trackName, artistAddress } = JSON.parse(event.body);
  if (!trackName || !artistAddress) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing fields' }) };
  }
  try {
    const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL);
    const signer = new ethers.Wallet(process.env.OWNER_PRIVATE_KEY, provider);
    const contract = new ethers.Contract(process.env.TKFM_TOKEN_ADDRESS, TKFMTokenABI, signer);

    // Mint RADIO_PLAY token
    const tx = await contract.mint(artistAddress, 3, 1);
    await tx.wait();

    return { statusCode: 200, body: JSON.stringify({ success: true, track: trackName, txHash: tx.hash }) };
  } catch(e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
}
