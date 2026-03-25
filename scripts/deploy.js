const hre = require("hardhat");

async function main() {

  const provider = new hre.ethers.JsonRpcProvider(process.env.RPC_URL);

  const wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);

  console.log("🚀 DEPLOYING WITH:", wallet.address);

  const balance = await provider.getBalance(wallet.address);
  console.log("💰 BALANCE:", hre.ethers.formatEther(balance));

  const Contract = await hre.ethers.getContractFactory("TKFMNFT", wallet);

  const contract = await Contract.deploy();

  await contract.waitForDeployment();

  console.log("✅ CONTRACT DEPLOYED TO:");
  console.log(await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
