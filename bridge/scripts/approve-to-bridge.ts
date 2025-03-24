import { ethers } from "hardhat";
import { BigNumber } from "ethers";

async function main() {
    const provider = ethers.provider;
    const admin = new ethers.Wallet(process.env.ADMIN_KEY || "", provider);
    const user = new ethers.Wallet(process.env.USER_KEY || "", provider);
    const amount = BigNumber.from(process.env.APPROVAL_AMOUNT || "0").mul(BigNumber.from(10).pow(18));
    const boaTokenBridge = process.env.BOA_TOKEN_BRIDGE || "";

    const factory = await ethers.getContractFactory("TestToken");
    const boaToken = await factory.attach(process.env.BOA_ADDRESS || "");
    const txTransfer = await boaToken.connect(admin).transfer(user.address, amount);
    await txTransfer.wait();

    const txApprove = await boaToken.connect(user).approve(boaTokenBridge, amount);
    await txApprove.wait();

    console.log(`Balance of User(${user.address}): ${await boaToken.balanceOf(user.address)}`);
    console.log(`Allowance of BOA_TOKEN_BRIDGE: ${await boaToken.allowance(user.address, boaTokenBridge)}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
