import { expect } from "chai";
import { ethers, upgrades } from "hardhat";

describe("DefiAVGPrice", function () {
    it("DefiAVGPrice ( Proxy )", async function () {
        const DefiAVGPrice = await ethers.getContractFactory("DefiAVGPrice");
        const DefiAVGPriceV2 = await ethers.getContractFactory("DefiAVGPriceV2");
        const DefiAVGPriceV3 = await ethers.getContractFactory("DefiAVGPriceV3");
        const defiAVGPrice = await upgrades.deployProxy(DefiAVGPrice, { unsafeAllow: ['delegatecall', 'external-library-linking', 'struct-definition', 'constructor'] });
        const defiAVGPriceV2 = await upgrades.upgradeProxy(defiAVGPrice.address, DefiAVGPriceV2, { unsafeAllow: ['delegatecall', 'external-library-linking', 'struct-definition', 'constructor'] });
        const defiAVGPriceV3 = await upgrades.upgradeProxy(defiAVGPriceV2.address, DefiAVGPriceV3, { unsafeAllow: ['delegatecall', 'external-library-linking', 'struct-definition', 'constructor'] });

        const setPriceTx = await defiAVGPriceV3.setPrice(20);

        // wait until the transaction is mined
        await setPriceTx.wait();

        expect(await defiAVGPriceV3.getPrice(1640626812)).to.equal(20);
    });
});
