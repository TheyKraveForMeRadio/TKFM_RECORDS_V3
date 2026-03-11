import hre from "hardhat";

async function main(){

 const ETF = await hre.ethers.getContractFactory("TKFMIndexETF");

 const etf = await ETF.deploy();

 await etf.waitForDeployment();

 console.log("ETF Contract:",await etf.getAddress());

}

main().catch((error)=>{
 console.error(error);
 process.exitCode=1;
});
