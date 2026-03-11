import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const Catalog = await hre.ethers.getContractFactory("TKFM_Catalog");
  const catalog = await Catalog.deploy();

  await catalog.waitForDeployment();

  const address = await catalog.getAddress();
  console.log("TKFM Catalog deployed at:", address);
  console.log("Run:");
  console.log(`export TKFM_CATALOG_ADDRESS=${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
