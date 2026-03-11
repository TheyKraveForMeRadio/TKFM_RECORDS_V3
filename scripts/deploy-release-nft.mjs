import pkg from "hardhat";
const { ethers } = pkg;

async function main() {
  const royaltiesAddress = process.env.TKFM_ROYALTIES_ADDRESS;

  if (!royaltiesAddress) {
    throw new Error("TKFM_ROYALTIES_ADDRESS not set");
  }

  console.log("=== DEPLOYING TKFM RELEASE NFT ===");
  console.log("Using Royalties:", royaltiesAddress);

  const NFT = await ethers.getContractFactory("TKFM_ReleaseNFT");
  const nft = await NFT.deploy(royaltiesAddress);

  await nft.waitForDeployment();

  const address = await nft.getAddress();

  console.log("TKFM Release NFT deployed at:", address);
  console.log("Run:");
  console.log(`export TKFM_NFT_ADDRESS=${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
