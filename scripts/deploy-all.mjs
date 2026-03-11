import pkg from "hardhat";
import fs from "fs";
const { ethers } = pkg;

async function main() {
  const [deployer, user1, user2] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // --- DEPLOY TOKEN ---
  const Token = await ethers.getContractFactory("TKFMToken");
  const token = await Token.deploy();
  await token.deployed();
  console.log("TKFMToken deployed to:", token.address);

  // --- DEPLOY ARTIST NFT ---
  const ArtistNFT = await ethers.getContractFactory("TKFMArtistNFT");
  const artistNFT = await ArtistNFT.deploy();
  await artistNFT.deployed();
  console.log("TKFMArtistNFT deployed to:", artistNFT.address);

  // --- DEPLOY RECORDS CONTRACT ---
  const Records = await ethers.getContractFactory("TKFMRecords");
  const records = await Records.deploy(artistNFT.address, token.address);
  await records.deployed();
  console.log("TKFMRecords deployed to:", records.address);

  // --- TRANSFER NFT OWNERSHIP TO RECORDS ---
  await artistNFT.transferOwnership(records.address);
  console.log("ArtistNFT ownership transferred to TKFMRecords");

  // --- MINT ARTIST NFTs ---
  const nftIds = [];
  nftIds.push(await records.mintArtistNFT(user1.address));
  nftIds.push(await records.mintArtistNFT(user2.address));
  console.log("Minted Artist NFTs:", nftIds);

  // --- CREATE INITIAL RELEASES ---
  const releases = [];
  releases.push(await records.createRelease(
    "Release 1",
    [deployer.address, user1.address],
    [70, 30],
    5 // time-locked 5s
  ));
  releases.push(await records.createRelease(
    "Release 2",
    [deployer.address, user2.address],
    [60, 40],
    3 // time-locked 3s
  ));
  console.log("Created releases:", releases);

  // --- SAVE DEPLOYED INFO ---
  const deployed = {
    TKFMToken: token.address,
    TKFMArtistNFT: artistNFT.address,
    TKFMRecords: records.address,
    NFTIds: nftIds,
    ReleaseIds: releases
  };
  fs.writeFileSync("deployed.json", JSON.stringify(deployed, null, 2));
  console.log("Saved deployed.json:", JSON.stringify(deployed, null, 2));

  console.log("\n✅ deploy-all completed successfully");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
