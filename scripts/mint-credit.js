import hre from "hardhat";
const { ethers } = hre;

// Correct Ethers v6 import for parseUnits
import pkg from "ethers";
const { parseUnits } = pkg;

async function main() {
  const [signer] = await ethers.getSigners();
  console.log("Minting with:", signer.address);

  const tokenAddress = process.env.TKFM_TOKEN_ADDRESS;
  if (!tokenAddress) throw new Error("TKFM_TOKEN_ADDRESS env var missing");

  const token = await ethers.getContractAt("TKFMToken", tokenAddress, signer);

  const amount = parseUnits("1000", 18); // works now
  const tx = await token.mint(signer.address, amount);
  await tx.wait();

  console.log("✅ Minted 1000 TKFM tokens to", signer.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
