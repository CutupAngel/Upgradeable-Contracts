// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
const { getImplementationAddress } = require('@openzeppelin/upgrades-core');

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Migrations = await ethers.getContractFactory("Migrations");
  const migrations = await Migrations.deploy();

  await migrations.deployed();

  const implementation1 = await getImplementationAddress(
    ethers.provider, migrations.address);

  console.log("AVGPriceV1 address:", migrations.address);
  console.log("implementation 1 address:", implementation1);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
