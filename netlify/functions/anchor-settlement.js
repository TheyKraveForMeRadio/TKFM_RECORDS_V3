import { ethers } from "ethers";
import crypto from "crypto";

export async function handler(event) {

  const data = JSON.parse(event.body);

  const hash = crypto
    .createHash("sha256")
    .update(JSON.stringify(data))
    .digest("hex");

  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

  const wallet = new ethers.Wallet(
    process.env.PRIVATE_KEY,
    provider
  );

  const contract = new ethers.Contract(
    process.env.SETTLEMENT_CONTRACT,
    [
      "function anchor(bytes32 hash) external"
    ],
    wallet
  );

  const tx = await contract.anchor("0x" + hash);

  await tx.wait();

  return {
    statusCode: 200,
    body: JSON.stringify({
      hash,
      tx: tx.hash
    })
  };
}
