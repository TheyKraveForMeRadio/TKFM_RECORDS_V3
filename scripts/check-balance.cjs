const hre = require("hardhat");

async function main() {
  const { ethers } = hre;

  const [signer] = await ethers.getSigners();
  const tokenAddress = process.env.TKFM_TOKEN_ADDRESS;

  if (!tokenAddress) {
    throw new Error("❌ TKFM_TOKEN_ADDRESS env var missing");
  }

  const token = await ethers.getContractAt(
    "TKFMToken",
    tokenAddress,
    signer
  );

  const CREDIT_ID = 1;

  const balance = await token.balanceOf(signer.address, CREDIT_ID);

  console.log("📦 TKFM CREDIT BALANCE");
  console.log("Wallet:", signer.address);
  console.log("Credits:", balance.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
