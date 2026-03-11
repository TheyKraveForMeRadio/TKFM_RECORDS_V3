import hre from "hardhat";

async function main(){

 const catalogNFT = await hre.ethers.getContractFactory("TKFMCatalogNFT");
 const nft = await catalogNFT.deploy();

 await nft.waitForDeployment();

 console.log("Catalog NFT:", await nft.getAddress());

 const distributor = await hre.ethers.getContractFactory("TKFMRoyaltyDistributor");

 const royalty = await distributor.deploy(
  "0x5FbDB2315678afecb367f032d93F642f64180aa3"
 );

 await royalty.waitForDeployment();

 console.log("Royalty Distributor:", await royalty.getAddress());

}

main().catch((error)=>{
 console.error(error);
 process.exitCode = 1;
});
