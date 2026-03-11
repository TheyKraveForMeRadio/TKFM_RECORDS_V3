import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(
"http://127.0.0.1:8545"
);

const pairABI = [
"function getReserves() view returns(uint112,uint112,uint32)"
];

export async function getPrice(pair){

const reserves = await pair.getReserves();

const price =
Number(reserves[0])/
Number(reserves[1]);

return price;

}
