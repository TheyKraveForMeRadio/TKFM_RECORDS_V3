const Redis = require("ioredis");
const { ethers } = require("ethers");

const redis = new Redis(process.env.REDIS_URL);

const CONTRACT_ADDRESS = process.env.TKFM_CONTRACT_ADDRESS;

const ABI = [
 "function transferFrom(address from, address to, uint256 tokenId) public"
];

exports.handler = async (event) => {
  try {

    const body = JSON.parse(event.body || "{}");
    const { token_id, from, to } = body;

    if(!token_id || !from || !to){
      return {
        statusCode:400,
        body:JSON.stringify({ error:"missing fields" })
      };
    }

    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const signer = new ethers.Wallet(process.env.MINTER_PRIVATE_KEY, provider);

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    // 🔗 EXECUTE ON-CHAIN TRANSFER
    const tx = await contract.transferFrom(from, to, token_id);
    const receipt = await tx.wait();

    // 🧠 MARK AS SYNCED
    await redis.set(`token:${token_id}:last_tx`, receipt.transactionHash);

    return {
      statusCode:200,
      body:JSON.stringify({
        success:true,
        tx: receipt.transactionHash
      })
    };

  } catch(err){
    return {
      statusCode:500,
      body:JSON.stringify({ error: err.message })
    };
  }
};
