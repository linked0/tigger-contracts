const { ethers }  = require('hardhat');

async function main() {
    const [deployer] = await ethers.getSigners();
    
    console.log(
        "Deploying contracts with the account:",
        deployer.address
    );

    const factory = await ethers.getContractFactory("UniswapV2Factory");
    const factoryContract = await factory.attach(process.env.FACTORY_ADDRESS).connect(deployer);
    console.log("Factory address:", factoryContract.address);
    console.log("allPairsLength:", (await factoryContract.allPairsLength()).toString());
    
    console.log("Account balance:", (await deployer.getBalance()).toString());
    const tokBoaAddress = process.env.BOA_ADDRESS;
    const gtbAddress = process.env.ETOKEN_ADDRESS;
    console.log(`tokBoaAddress: ${tokBoaAddress}, gtbAddress: ${gtbAddress}`);

    const boaGtaLpAddress = await factoryContract.getPair(tokBoaAddress, gtbAddress);
    console.log(`Liquidity pool at address: ${boaGtaLpAddress}`);

    const pairFactory = await ethers.getContractFactory("UniswapV2Pair");
    const pairContract = await pairFactory.attach(boaGtaLpAddress).connect(deployer);
    console.log("Router address:", pairContract.address);
    const [reserve0, reserve1, timestampLast] = await pairContract.getReserves();
    console.log("reserve0:", reserve0.toString());
    console.log("reserve1:", reserve1.toString());
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });