#!/usr/bin/env node
import fs from "fs";
import hardhat from "hardhat";
const { ethers } = hardhat;

async function main() {
  if (!fs.existsSync("deployed.json")) {
    console.error("ERROR: deployed.json not found. Run deploy-all first.");
    process.exit(1);
  }

  const deployed = JSON.parse(fs.readFileSync("deployed.json", "utf8"));
  const [deployer, user1] = await ethers.getSigners();

  console.log("\n=== Deployer Info ===");
  console.log("Address:", deployer.address);

  const token = await ethers.getContractAt("TKFMToken", deployed.TKFMToken);
  const artistNFT = await ethers.getContractAt("TKFMArtistNFT", deployed.TKFMArtistNFT);
  const royalty = await ethers.getContractAt("TKFMRoyaltySplitter", deployed.TKFMRoyaltySplitter);

  console.log("\n=== TKFMToken Checks ===");
  const decimals = await token.decimals();
  const deployerBal = await token.balanceOf(deployer.address);

  console.log("Deployer balance:", ethers.formatUnits(deployerBal, decimals));
  console.log("Minting locked:", await token.mintingLocked());
  console.log("Owner:", await token.owner());
  console.log("Authority:", await token.authority());

  if (await token.mintingLocked()) {
    console.log("\nUnlocking minting for test...");
    if (token.unlockMinting) {
      const tx = await token.unlockMinting();
      await tx.wait();
    } else {
      const tx = await token.setMintingLocked(false);
      await tx.wait();
    }
  }

  console.log("\n=== Token Transfer Test ===");
  const amount = ethers.parseUnits("2000", decimals);
  const txTransfer = await token.transfer(user1.address, amount);
  await txTransfer.wait();

  const userBal = await token.balanceOf(user1.address);
  console.log("User1 balance after transfer:", ethers.formatUnits(userBal, decimals));

  console.log("\n=== NFT Minting Test ===");
  const txMint = await artistNFT.mint(user1.address);
  const receipt = await txMint.wait();

  let tokenId = "unknown";
  for (const log of receipt.logs) {
    try {
      const parsed = artistNFT.interface.parseLog(log);
      if (parsed.name === "Transfer") {
        tokenId = parsed.args.tokenId.toString();
        break;
      }
    } catch {}
  }

  console.log("NFT minted to User1 | tokenId:", tokenId);

  console.log("\n=== Royalty Splitter Test ===");
  const shares = await royalty.shares(deployer.address);
  console.log("Deployer shares:", shares.toString());

  console.log("\n✅ ALL TESTS PASSED\n");
}

main().catch((err) => {
  console.error("UNCAUGHT TEST ERROR:", err);
  process.exit(1);
});
