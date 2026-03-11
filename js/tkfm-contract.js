import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.10.0/+esm";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const abi = [
 "function transfer(address to, uint amount) public returns (bool)",
 "function balanceOf(address owner) view returns (uint256)"
];

let provider;
let signer;
let contract;

export async function connectContract(){

 if(!window.ethereum){
  alert("Install Metamask");
  return;
 }

 provider = new ethers.BrowserProvider(window.ethereum);

 await provider.send("eth_requestAccounts", []);

 signer = await provider.getSigner();

 contract = new ethers.Contract(contractAddress, abi, signer);

 return contract;

}

export async function sendTokens(to, amount){

 const tx = await contract.transfer(to, amount);

 await tx.wait();

 return tx;

}

export async function getBalance(address){

 const balance = await contract.balanceOf(address);

 return ethers.formatUnits(balance,18);

}
