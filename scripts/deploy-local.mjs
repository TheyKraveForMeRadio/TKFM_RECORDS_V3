import hre from "hardhat";
const { ethers } = hre;

async function main() {
  const [deployer, alice, bob] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  console.log("Deployer balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH");

  // 1️⃣ Deploy TKFMToken
  const Token = await ethers.getContractFactory("TKFMToken");
  const token = await Token.deploy();
  await token.waitForDeployment();
  console.log("TKFMToken deployed to:", token.target);

  // 2️⃣ Deploy TKFMRecords
  const Records = await ethers.getContractFactory("TKFMRecords");
  const records = await Records.deploy(token.target);
  await records.waitForDeployment();
  console.log("TKFMRecords deployed to:", records.target);

  // Lock token minting
  await records.lockTokenMinting();
  console.log("✅ Token minting locked via TKFMRecords");

  // 3️⃣ Deploy TKFMRoyaltySplitter
  const payees = [deployer.address, alice.address, bob.address];
  const shares = [50, 30, 20];
  const Splitter = await ethers.getContractFactory("TKFMRoyaltySplitter");
  const splitter = await Splitter.deploy(payees, shares);
  await splitter.waitForDeployment();
  console.log("TKFMRoyaltySplitter deployed to:", splitter.target);

  // Check deployer token balance
  console.log("Deployer token balance:", (await token.balanceOf(deployer.address)).toString());
}

main().catch((e) => {
  console.error("DEPLOY ERROR:", e);
  process.exit(1);
});
