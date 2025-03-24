import { ethers } from "hardhat";

async function main() {
    const provider = ethers.provider;
    const admin = new ethers.Wallet(process.env.ADMIN_KEY || "", provider);
    const feeManager = new ethers.Wallet(process.env.FEE_MANAGER_KEY || "", provider);
    const boaTokenAddress = process.env.BOA_ADDRESS || "";
    console.log(`admin: ${admin.address}, feeManager: ${feeManager.address}, boaTokenAddress: ${boaTokenAddress}`);

    const timeLock = 60 * 60 * 24;

    const boaTokenBridge = await ethers.deployContract("BOATokenBridge", [
      boaTokenAddress,
      timeLock,
      feeManager.address,
      true,
    ]);
    await boaTokenBridge.deployed();
    console.log(`BOA_TOKEN_BRIDGE=${boaTokenBridge.address}`);

    const boaCoinBridge = await ethers.deployContract("BOACoinBridge", [
      timeLock,
      feeManager.address,
      true,
    ]);
    await boaCoinBridge.deployed();
    console.log(`BOA_COIN_BRIDGE=${boaCoinBridge.address}`);

    const tokenBridge = await ethers.deployContract("TokenBridge", [60]);
    await tokenBridge.deployed();
    console.log(`TOKEN_BRIDGE=${tokenBridge.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});