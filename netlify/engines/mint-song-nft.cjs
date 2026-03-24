const { ethers } = require("ethers");
const Redis = require("ioredis");

const redis = new Redis(process.env.REDIS_URL);

// ⚠️ USE SAME CONTRACT + ABI AS FRONTEND
const CONTRACT_ADDRESS = process.env.TKFM_CONTRACT_ADDRESS;

const ABI = [
 "function mint(string memory tokenURI) public returns (uint256)"
];

exports.handler = async (event) => {
  try {

    const body = JSON.parse(event.body || "{}");

    const { metadataURI, catalog_id, wallet } = body;

    if(!metadataURI || !catalog_id || !wallet){
      return {
        statusCode:400,
        body:JSON.stringify({ error:"missing fields" })
      };
    }

    // 🔐 SERVER WALLET (MINTER)
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const signer = new ethers.Wallet(process.env.MINTER_PRIVATE_KEY, provider);

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    // 🔥 MINT
    const tx = await contract.mint(metadataURI);
    const receipt = await tx.wait();

    // ⚡ EXTRACT TOKEN ID (basic fallback)
    const token_id = Date.now(); // replace with event parsing later

    // 🧠 REDIS LINK
    await redis.set(`catalog:${catalog_id}:token_id`, token_id);
    await redis.set(`token:${token_id}:owner`, wallet);

    // 📈 AUTO-LIST INTO MARKET (INITIAL PRICE)
    await redis.zadd(`orderbook:${catalog_id}:sell`, 1, JSON.stringify({
      user: wallet,
      price: 1,
      quantity: 1,
      token_id
    }));

    return {
      statusCode:200,
      body:JSON.stringify({
        success:true,
        token_id,
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
