import pkg from "hardhat";
const { ethers } = pkg;

const {
  TKFM_NFT_ADDRESS,
  TKFM_ROYALTIES_ADDRESS
} = process.env;

if (!TKFM_NFT_ADDRESS)
  throw new Error("TKFM_NFT_ADDRESS not set");

if (!TKFM_ROYALTIES_ADDRESS)
  throw new Error("TKFM_ROYALTIES_ADDRESS not set");

async function main() {
  console.log("=== DEPLOYING TKFM AUTHORITY (ROYALTY WIRED) ===");
  console.log("Using NFT:", TKFM_NFT_ADDRESS);
  console.log("Using Royalties:", TKFM_ROYALTIES_ADDRESS);

  const Authority = await ethers.getContractFactory("TKFM_Authority");

  const authority = await Authority.deploy(
    TKFM_NFT_ADDRESS,
    TKFM_ROYALTIES_ADDRESS
  );

  await authority.waitForDeployment();

  const address = await authority.getAddress();

  console.log("TKFM Authority deployed at:", address);
  console.log("Run:");
  console.log(`export TKFM_AUTHORITY_ADDRESS=${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
