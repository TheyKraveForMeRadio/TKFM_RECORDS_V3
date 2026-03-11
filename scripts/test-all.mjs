import pkg from "hardhat";
import fs from "fs";
const { ethers } = pkg;

async function main() {
  const deployed = JSON.parse(fs.readFileSync("deployed.json", "utf-8"));

  const [deployer, user1, user2] = await ethers.getSigners();
  console.log("\n=== DEPLOYER ===");
  console.log("Address:", deployer.address);

  // Attach contracts
  const Token = await ethers.getContractFactory("TKFMToken");
  const token = await Token.attach(deployed.TKFMToken);

  const ArtistNFT = await ethers.getContractFactory("TKFMArtistNFT");
  const artistNFT = await ArtistNFT.attach(deployed.TKFMArtistNFT);

  const Records = await ethers.getContractFactory("TKFMRecords");
  const records = await Records.attach(deployed.TKFMRecords);

  // --- TOKEN TEST ---
  console.log("\n=== TOKEN TEST ===");
  // Mint initial balances
  await token.mint(deployer.address, 1000000);
  await token.mint(user1.address, 1000);
  console.log("Deployer balance:", (await token.balanceOf(deployer.address)).toString());
  console.log("User1 balance:", (await token.balanceOf(user1.address)).toString());

  // --- NFT TEST ---
  console.log("\n=== NFT TEST ===");
  const nftId = await records.mintArtistNFT(user1.address);
  console.log("Minted Artist NFT ID:", nftId);

  // --- RELEASE TEST ---
  console.log("\n=== RELEASE TEST ===");
  const payees = [deployer.address, user2.address];
  const shares = [70, 30]; // 70% / 30% split

  // Create release with 5 sec time-locked advance
  const releaseId = await records.createRelease(
    "Release 1",
    payees,
    shares,
    5
  );
  console.log("Created releaseId:", releaseId);

  const releaseAddress = await records.releaseContracts(releaseId);
  console.log("Release contract address:", releaseAddress);

  // Attach Release contract
  const Release = await ethers.getContractFactory("TKFMRelease");
  const release = await Release.attach(releaseAddress);

  // Try signing (should fail if not owner)
  try {
    await release.signRelease();
  } catch(e) {
    console.log("Sign attempt by non-owner correctly reverted:", e.message.split("\n")[0]);
  }

  // Sign with NFT owner
  const user1Release = release.connect(user1);
  await user1Release.signRelease();
  console.log("NFT owner signed release");

  // --- DEPOSIT TOKFM TOKEN AS REVENUE ---
  await token.transfer(releaseAddress, 1000);
  console.log("Deposited 1000 TKFMToken to release contract");

  // --- TIME-LOCK ENFORCEMENT ---
  try {
    await records.releaseFunds(releaseId);
  } catch(e) {
    console.log("Release funds before lock correctly reverted:", e.message.split("\n")[0]);
  }

  console.log("Waiting 6 seconds to unlock funds...");
  await new Promise(r => setTimeout(r, 6000));

  // Release funds after lock
  await records.releaseFunds(releaseId);
  console.log("Funds released successfully after time lock");

  // --- MULTIPLE RELEASES ---
  const release2Id = await records.createRelease(
    "Release 2",
    payees,
    shares,
    2
  );
  console.log("Created second releaseId:", release2Id);

  const release2Address = await records.releaseContracts(release2Id);
  const release2 = await Release.attach(release2Address);
  const user1Release2 = release2.connect(user1);
  await user1Release2.signRelease();
  console.log("NFT owner signed second release");

  // Deposit tokens
  await token.transfer(release2Address, 500);
  console.log("Deposited 500 TKFMToken to second release");

  // Wait for time-lock
  await new Promise(r => setTimeout(r, 3000));
  await records.releaseFunds(release2Id);
  console.log("Second release funds released after time lock");

  console.log("\n✅ ALL TESTS COMPLETED SUCCESSFULLY");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
