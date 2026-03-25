import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.10.0/+esm";

const contractAddress = "REPLACE_WITH_YOUR_CONTRACT_ADDRESS";

const abi = [
  "function mint(string memory tokenURI) public returns (uint256)",
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

export async function mintSongNFT(metadataURI){

  if(!contract){
    await connectContract();
  }

  const tx = await contract.mint(metadataURI);

  const receipt = await tx.wait();

  console.log("NFT Minted:", receipt);

  return receipt;
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
