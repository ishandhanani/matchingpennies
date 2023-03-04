const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with account: ", deployer.address);
  console.log("Account balance: ", (await deployer.getBalance()).toString());

  const MPcontract = await ethers.getContractFactory("MatchingPennies");
  const mp = await MPcontract.deploy();

  console.log("Address", mp.address);
}
  
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
