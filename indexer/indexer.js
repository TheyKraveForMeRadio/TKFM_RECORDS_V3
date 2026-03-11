import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(
  process.env.RPC_URL
);

const contractAddress = process.env.POOL_CONTRACT;

const abi = [
  "event Deposit(address investor,uint256 amount)"
];

const contract = new ethers.Contract(
  contractAddress,
  abi,
  provider
);

export function startIndexer(db){

  contract.on("Deposit",(investor,amount)=>{

    db.investors.push({
      id: investor,
      deposited: Number(amount)/1e18
    });

  });

}
