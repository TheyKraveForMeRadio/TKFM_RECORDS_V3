import hre from "hardhat";

async function main() {

  const Settlement = await hre.ethers.getContractFactory("SettlementMirror");

  const settlement = await Settlement.deploy();

  await settlement.waitForDeployment();

  const address = await settlement.getAddress();

  console.log("Settlement Mirror deployed:", address);

}

main();
