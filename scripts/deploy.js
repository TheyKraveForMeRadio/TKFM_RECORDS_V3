import hre from "hardhat";

async function main() {

  console.log("🚀 Starting deployment...");

  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying with wallet:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Wallet balance:", hre.ethers.formatEther(balance), "ETH");

  // Replace with your contract name if different
  const Contract = await hre.ethers.getContractFactory("TKFMToken");

  const contract = await Contract.deploy();

  await contract.waitForDeployment();

  const address = await contract.getAddress();

  console.log("✅ Contract deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
