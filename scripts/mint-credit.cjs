const hre = require("hardhat");

async function main() {
  const { ethers } = hre;

  const [signer] = await ethers.getSigners();
  console.log("Minting with:", signer.address);

  const tokenAddress = process.env.TKFM_TOKEN_ADDRESS;
  if (!tokenAddress) {
    throw new Error("❌ TKFM_TOKEN_ADDRESS env var missing");
  }

  const token = await ethers.getContractAt(
    "TKFMToken",
    tokenAddress,
    signer
  );

  // ERC1155 CREDIT token = id 1
  const CREDIT_ID = 1;
  const AMOUNT = 1000;

  const tx = await token.mint(signer.address, AMOUNT);
  await tx.wait();

  console.log("✅ Minted", AMOUNT, "TKFM credits to", signer.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
