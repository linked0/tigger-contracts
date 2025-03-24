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
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });