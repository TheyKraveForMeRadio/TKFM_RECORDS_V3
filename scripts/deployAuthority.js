import pkg from "hardhat";
const { ethers } = pkg;

async function main() {
  const [deployer] = await ethers.getSigners();

  const royaltiesAddress = process.env.TKFM_ROYALTIES_ADDRESS;

  if (!royaltiesAddress) {
    throw new Error("TKFM_ROYALTIES_ADDRESS not set");
  }

  console.log("Deploying Authority...");
  console.log("Signer:", deployer.address);
  console.log("Royalties:", royaltiesAddress);

  const Authority = await ethers.getContractFactory("TKFM_Authority");
  const authority = await Authority.deploy(royaltiesAddress);

  await authority.waitForDeployment();

  console.log("TKFM_Authority deployed to:", await authority.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
