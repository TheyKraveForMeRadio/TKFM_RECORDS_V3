const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const deployed = JSON.parse(
    fs.readFileSync("deployments/localhost.json", "utf8")
  );

  const records = await hre.ethers.getContractAt(
    "TKFMRecords",
    deployed.TKFMRecords
  );

  const token = await hre.ethers.getContractAt(
    "TKFMToken",
    deployed.TKFMToken
  );

  console.log("Linking token to records...");
  await (await records.setToken(deployed.TKFMToken)).wait();

  console.log("Locking minting (deployer authority)...");
  await (await token.lockMinting()).wait();

  console.log("Transferring token authority to records...");
  await (await token.setAuthority(deployed.TKFMRecords)).wait();

  console.log("✅ AUTHORITY FINALIZED — MINT PERMANENTLY LOCKED");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
