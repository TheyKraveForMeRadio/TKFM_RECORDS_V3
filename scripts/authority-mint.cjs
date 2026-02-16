const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const provider = hre.ethers.provider;

  const deployed = JSON.parse(
    fs.readFileSync("deployments/localhost.json", "utf8")
  );

  const RECORDS_ADDRESS = deployed.TKFMRecords;
  const TOKEN_ADDRESS = deployed.TKFMToken;

  console.log("Authority + Mint Setup");
  console.log("Deployer:", deployer.address);

  const balance = await provider.getBalance(deployer.address);
  console.log("ETH Balance:", hre.ethers.formatEther(balance));

  const records = await hre.ethers.getContractAt(
    "TKFMRecords",
    RECORDS_ADDRESS
  );
  const token = await hre.ethers.getContractAt(
    "TKFMToken",
    TOKEN_ADDRESS
  );

  console.log("Setting authority...");
  await (await records.setAuthority(deployer.address)).wait();
  await (await token.setAuthority(deployer.address)).wait();

  console.log("Minting TKFM...");
  await (await token.mint(
    deployer.address,
    hre.ethers.parseUnits("1000000", 18)
  )).wait();

  const tkfmBal = await token.balanceOf(deployer.address);
  console.log("TKFM Balance:", hre.ethers.formatUnits(tkfmBal, 18));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
