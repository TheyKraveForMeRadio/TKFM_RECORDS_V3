import hre from "hardhat";

async function main() {

 const CatalogToken = await hre.ethers.getContractFactory("TKFMCatalogToken");

 const token = await CatalogToken.deploy(
  "catalog_001",
  "TKFM Catalog Token",
  "TKCAT",
  hre.ethers.parseUnits("1000000", 18)
 );

 await token.waitForDeployment();

 console.log("Catalog Token deployed:", await token.getAddress());

}

main().catch((error) => {

 console.error(error);
 process.exitCode = 1;

});
