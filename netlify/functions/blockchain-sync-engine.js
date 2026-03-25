const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);

const { ethers } = require("ethers");

const RPC_URL = process.env.RPC_URL;
let PRIVATE_KEY = process.env.PRIVATE_KEY;

if(PRIVATE_KEY.startsWith('"') || PRIVATE_KEY.startsWith("'")){
  PRIVATE_KEY = PRIVATE_KEY.slice(1,-1);
}

if(!PRIVATE_KEY.startsWith("0x")){
  PRIVATE_KEY = "0x" + PRIVATE_KEY;
}

const CONTRACT_ADDRESS = process.env.TKFM_CONTRACT_ADDRESS;

const abi = [
  "function transferFrom(address from, address to, uint256 tokenId) public"
];

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

exports.handler = async () => {

  const keys = await redis.keys("trades:*");

  for(const key of keys){

    const trades = await redis.lrange(key, 0, 10);

    for(const tradeRaw of trades){

      const trade = JSON.parse(tradeRaw);

      const tokenId = trade.catalog_id || 1;

      try{

        const tx = await contract.transferFrom(
          trade.seller,
          trade.buyer,
          tokenId
        );

        await tx.wait();

        console.log("Synced trade:", trade);

      } catch(err){
        console.log("Sync error:", err.message);
      }

    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ synced: true })
  };
};
