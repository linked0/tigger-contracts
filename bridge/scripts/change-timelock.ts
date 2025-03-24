import { ethers } from "hardhat";

async function main() {
    const provider = ethers.provider;
    const admin = new ethers.Wallet(process.env.ADMIN_KEY || "", provider);

    const boaCoinBridge = await ethers.getContractAt("BOACoinBridge", process.env.BOA_COIN_BRIDGE || "", admin);
    await boaCoinBridge.changeTimeLock(60);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
