import hre from "hardhat";
const { ethers } = hre;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Deployer balance:", ethers.formatEther(balance), "ETH");

  // Deploy TKFMToken
  const Token = await ethers.getContractFactory("TKFMToken");
  const token = await Token.deploy();
  await token.waitForDeployment();
  console.log("TKFMToken deployed to:", token.target);

  // Deploy TKFMRecords
  const Records = await ethers.getContractFactory("TKFMRecords");
  const records = await Records.deploy(token.target);
  await records.waitForDeployment();
  console.log("TKFMRecords deployed to:", records.target);

  // TRANSFER ownership of token to records contract
  const tx = await token.transferOwnership(records.target);
  await tx.wait();
  console.log("TKFMToken ownership transferred to TKFMRecords contract ✅");

  console.log("Deployment complete ✅");
}

main().catch((e) => {
  console.error("DEPLOY ERROR:", e);
  process.exit(1);
});
