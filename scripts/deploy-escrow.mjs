import hre from "hardhat";

async function main() {
  const royaltiesAddr = process.env.TKFM_ROYALTIES_ADDRESS;
  if (!royaltiesAddr) {
    throw new Error("TKFM_ROYALTIES_ADDRESS not set");
  }

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);
  console.log("Using Royalties:", royaltiesAddr);

  const Escrow = await hre.ethers.getContractFactory("TKFM_PayoutEscrow");
  const escrow = await Escrow.deploy(royaltiesAddr);

  await escrow.waitForDeployment();

  const address = await escrow.getAddress();
  console.log("TKFM Escrow deployed at:", address);
  console.log("Run:");
  console.log(`export TKFM_ESCROW_ADDRESS=${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
