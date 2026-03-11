import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const Royalties = await hre.ethers.getContractFactory("TKFM_Royalties");
  const royalties = await Royalties.deploy();

  await royalties.waitForDeployment();

  const address = await royalties.getAddress();
  console.log("TKFM Royalties deployed at:", address);
  console.log("Run:");
  console.log(`export TKFM_ROYALTIES_ADDRESS=${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
