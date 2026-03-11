import hre from "hardhat";

async function main(){

 const Catalog = await hre.ethers.getContractFactory("TKFMCatalogNFT");
 const catalog = await Catalog.deploy();
 await catalog.waitForDeployment();

 const Royalty = await hre.ethers.getContractFactory("TKFMRoyaltyToken");
 const royalty = await Royalty.deploy(
  hre.ethers.parseUnits("100000000",18)
 );
 await royalty.waitForDeployment();

 const Oracle = await hre.ethers.getContractFactory("TKFMStreamingOracle");
 const oracle = await Oracle.deploy();
 await oracle.waitForDeployment();

 const Licensing = await hre.ethers.getContractFactory("TKFMLicensing");
 const licensing = await Licensing.deploy();
 await licensing.waitForDeployment();

 console.log("CatalogNFT:",await catalog.getAddress());
 console.log("RoyaltyToken:",await royalty.getAddress());
 console.log("StreamingOracle:",await oracle.getAddress());
 console.log("Licensing:",await licensing.getAddress());

}

main();
