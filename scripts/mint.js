import pkg from "hardhat";
const { ethers } = pkg;

async function main() {
  const [owner, receiver] = await ethers.getSigners();

  const TOKEN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const token = await ethers.getContractAt("TKFMToken", TOKEN_ADDRESS);

  const amount = ethers.parseUnits("1000000", 18); // 1,000,000 TKFM

  const tx = await token.mint(receiver.address, amount);
  await tx.wait();

  console.log("Minted", amount.toString(), "to", receiver.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
