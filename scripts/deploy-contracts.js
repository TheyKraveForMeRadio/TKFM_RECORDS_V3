import { ethers } from "hardhat";

async function main(){

 const Vault =
 await ethers.getContractFactory("RoyaltyVault");

 const vault =
 await Vault.deploy();

 await vault.waitForDeployment();

 console.log(
  "RoyaltyVault:",
  await vault.getAddress()
 );

 const NFT =
 await ethers.getContractFactory("CatalogNFT");

 const nft =
 await NFT.deploy();

 await nft.waitForDeployment();

 console.log(
  "CatalogNFT:",
  await nft.getAddress()
 );

}

main();
