const { ethers } = require("hardhat");
require('dotenv').config();

// Getting feeTo from the contract
async function main() {
    const factory = await ethers.getContractFactory('UniswapV2Factory');
    console.log('FACTORY_ADDRESS', process.env.FACTORY_ADDRESS);
    const contract = await factory.attach(process.env.FACTORY_ADDRESS);
    const feeTo = await contract.feeTo();
    
    console.log(feeTo);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });