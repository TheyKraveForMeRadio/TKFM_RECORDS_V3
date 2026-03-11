import hre from "hardhat";

async function main(){

 const Bridge = await hre.ethers.getContractFactory("TKFMBridge");

 const bridge = await Bridge.deploy();

 await bridge.waitForDeployment();

 console.log(
  "TKFM Bridge:",
  await bridge.getAddress()
 );

}

main();
