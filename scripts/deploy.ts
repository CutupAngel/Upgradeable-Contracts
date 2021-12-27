// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, upgrades } from "hardhat";
const { getImplementationAddress } = require('@openzeppelin/upgrades-core');

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const DefiAVGPrice = await ethers.getContractFactory("DefiAVGPrice");
  const avgPriceV1 = await upgrades.deployProxy(DefiAVGPrice, { unsafeAllow: ['delegatecall', 'external-library-linking', 'struct-definition', 'constructor'] });

  await avgPriceV1.deployed();

  const implementation1 = await getImplementationAddress(
    ethers.provider, avgPriceV1.address);

  //Upgrading to V2
  const DefiAVGPriceV2 = await ethers.getContractFactory("DefiAVGPriceV2");
  const avgPriceV2 = await upgrades.upgradeProxy(avgPriceV1.address, DefiAVGPriceV2, { unsafeAllow: ['delegatecall', 'external-library-linking', 'struct-definition', 'constructor'] });

  await avgPriceV2.deployed();

  const implementation2 = await getImplementationAddress(
    ethers.provider,
    avgPriceV2.address);

  //Upgrading to V3
  const DefiAVGPriceV3 = await ethers.getContractFactory("DefiAVGPriceV3");
  const avgPriceV3 = await upgrades.upgradeProxy(avgPriceV2.address, DefiAVGPriceV3, { unsafeAllow: ['delegatecall', 'external-library-linking', 'struct-definition', 'constructor'] });

  await avgPriceV3.deployed();

  const implementation3 = await getImplementationAddress(
    ethers.provider,
    avgPriceV3.address);

  console.log("AVGPriceV1 address:", avgPriceV1.address);
  console.log("AVGPriceV2 address:", avgPriceV2.address);
  console.log("AVGPriceV3 address:", avgPriceV2.address);
  console.log("implementation 1 address:", implementation1);
  console.log("implementation 2 address:", implementation2);
  console.log("implementation 3 address:", implementation3);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
