#!/usr/bin/env node
import fs from "fs";
import hardhat from "hardhat";
const { ethers } = hardhat;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("\nDeploying contracts with account:", deployer.address);

  // 1) Deploy TKFMToken (pass initialAuthority)
  const TokenFactory = await ethers.getContractFactory("TKFMToken");
  const token = await TokenFactory.deploy(deployer.address);
  console.log("TKFMToken deployed to:", token.target || token.address);

  // 2) Deploy TKFMRecords (needs token address)
  const RecordsFactory = await ethers.getContractFactory("TKFMRecords");
  const records = await RecordsFactory.deploy(token.target || token.address);
  console.log("TKFMRecords deployed to:", records.target || records.address);

  // 3) Deploy TKFMArtistNFT
  const ArtistNFTFactory = await ethers.getContractFactory("TKFMArtistNFT");
  const artistNFT = await ArtistNFTFactory.deploy();
  console.log("TKFMArtistNFT deployed to:", artistNFT.target || artistNFT.address);

  // 4) Deploy TKFMRoyaltySplitter with a simple payees/shares
  const RoyaltyFactory = await ethers.getContractFactory("TKFMRoyaltySplitter");
  const royalty = await RoyaltyFactory.deploy([deployer.address], [100]);
  console.log("TKFMRoyaltySplitter deployed to:", royalty.target || royalty.address);

  // 5) Ensure token minting locked (use lockMinting if available)
  try {
    if (typeof token.lockMinting === "function") {
      const tx = await token.lockMinting();
      await tx.wait();
      console.log("Token minting locked:", await token.mintingLocked());
    } else if (typeof token.setMintingLocked === "function") {
      const tx = await token.setMintingLocked(true);
      await tx.wait();
      console.log("Token minting locked (via setMintingLocked):", await token.mintingLocked());
    } else {
      console.log("No lock function found; token.mintingLocked() =", await token.mintingLocked());
    }
  } catch (err) {
    console.log("Warning: lockMinting step failed (continuing):", err.message || err);
  }

  // 6) Save deployed addresses
  const deployed = {
    TKFMToken: token.target || token.address,
    TKFMRecords: records.target || records.address,
    TKFMArtistNFT: artistNFT.target || artistNFT.address,
    TKFMRoyaltySplitter: royalty.target || royalty.address
  };
  fs.writeFileSync("deployed.json", JSON.stringify(deployed, null, 2));
  console.log("\nSaved deployed.json:");
  console.log(JSON.stringify(deployed, null, 2));

  console.log("\n✅ deploy-all completed successfully\n");
}

main().catch((error) => {
  console.error("UNCAUGHT DEPLOY ERROR:", error);
  process.exit(1);
});
