import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const TOKEN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // your deployed token
  const TOKEN_ID = 1;
  const AMOUNT = 1000;
  const TO_ADDRESS = deployer.address;

  const token = await hre.ethers.getContractAt("TKFMToken", TOKEN_ADDRESS, deployer);
  const tx = await token.mint(TO_ADDRESS, TOKEN_ID, AMOUNT);
  await tx.wait();

  console.log("✅ MINT COMPLETE");
  console.log("To:", TO_ADDRESS);
  console.log("Token ID:", TOKEN_ID);
  console.log("Amount:", AMOUNT);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
