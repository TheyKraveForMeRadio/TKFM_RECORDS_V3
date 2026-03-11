import pkg from "hardhat";
const { ethers } = pkg;

async function main() {

  const [deployer] = await ethers.getSigners();

  console.log("Deploying TKFM_Royalties with:", deployer.address);

  const Royalties = await ethers.getContractFactory("TKFM_Royalties");
  const royalties = await Royalties.deploy();

  await royalties.waitForDeployment();

  const address = await royalties.getAddress();

  console.log("TKFM_Royalties deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
