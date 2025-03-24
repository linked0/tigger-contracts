import { ethers } from "hardhat";

async function main() {
    const provider = ethers.provider;
    const admin = new ethers.Wallet(process.env.ADMIN_KEY || "", provider);
    const manAddr = process.env.BOA_COIN_BRIDGE_MANAGER || "";

    const boaCoinBridge = await ethers.getContractAt("BOACoinBridge", process.env.BOA_COIN_BRIDGE || "", admin);
    await boaCoinBridge.addManager(manAddr);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
