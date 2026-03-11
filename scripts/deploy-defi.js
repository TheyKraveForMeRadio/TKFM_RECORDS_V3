import { ethers } from "hardhat";

async function main(){

 const Fractionalizer =
 await ethers.getContractFactory(
  "RoyaltyFractionalizer"
 );

 const frac =
 await Fractionalizer.deploy();

 await frac.waitForDeployment();

 console.log(
  "Fractionalizer:",
  await frac.getAddress()
 );

}

main();
