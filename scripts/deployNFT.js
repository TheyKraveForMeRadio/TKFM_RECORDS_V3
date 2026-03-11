import pkg from "hardhat";
const { ethers } = pkg;

async function main() {
  const NFT = await ethers.getContractFactory("TKFM_ReleaseNFT");
  const nft = await NFT.deploy();

  await nft.waitForDeployment();

  console.log("TKFM_ReleaseNFT deployed to:", await nft.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
