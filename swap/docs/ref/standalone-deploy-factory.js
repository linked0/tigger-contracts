const { ethers } = require('hardhat');
require('dotenv').config();

// Deploy function
async function deploy() {
   [account] = await ethers.getSigners();
   deployerAddress = account.address;
   console.log(`Deploying contracts using ${deployerAddress}`);


   //Deploy WETH
   const weth = await ethers.getContractFactory('WETH');
   const wethInstance = await weth.deploy();
   await wethInstance.deployed();

   console.log(`WETH deployed to : ${wethInstance.address}`);

   //Deploy Factory
   const factory = await ethers.getContractFactory('UniswapV2Factory');
   const factoryInstance = await factory.deploy(deployerAddress);
   await factoryInstance.deployed();

   console.log(`Factory deployed to : ${factoryInstance.address}`);

   //Deploy Router passing Factory Address and WETH Address
   const router = await ethers.getContractFactory('UniswapV2Router02');
   const routerInstance = await router.deploy(
       factoryInstance.address,
       wethInstance.address
   );
   await routerInstance.deployed();

   console.log(`Router V02 deployed to :  ${routerInstance.address}`);

   //Deploy Multicall (needed for Interface)
   const multicall = await ethers.getContractFactory('Multicall');
   const multicallInstance = await multicall.deploy();
   await multicallInstance.deployed();

   console.log(`Multicall deployed to : ${multicallInstance.address}`);

   //CalHash
   const calHash = await ethers.getContractFactory('CalHash');
   const calHashInstance = await calHash.deploy();
   await calHashInstance.deployed();
   const hash = await calHashInstance.getInitHash();
   console.log(`hash deployed to : ${hash.toString()}`);

   /// Only DEV
   //Deploy Tokens

   const gtk = await ethers.getContractFactory('Token');
   const gtkInstance = await gtk.deploy('Token G', 'GTK');
   console.log(`G Token deployed to : ${gtkInstance.address}`);

   const gte = await ethers.getContractFactory('Token');
   const gteInstance = await gte.deploy('Token E', 'ETK');
   console.log(`E Token deployed to : ${gteInstance.address}`);


   await factoryInstance.setFeeTo(process.env.FEE_TO);
   const feeTo = await factoryInstance.feeTo()
   console.log(`setFeeTo : ${feeTo}`)

   // /**/contract.name.call().then(function(v) {console.log(v)})
   //Approve router on tokens of gta and gtb
   // console.log(`Approving Router on Token1`);
   // await gtaInstance.approve(
   //     routerInstance.address,
   //     '1000000000000000000000000'
   // );
   // // console.log(`Approving Router on Token2`);
   // // await gtbInstance.approve(
   // //     routerInstance.address,
   // //     '1000000000000000000000000'
   // // );
   //
   // //Create Pair with Factory and Get Address
   // await factoryInstance.createPair(wethInstance.address, gtbInstance.address);
   // const boa_gta_lpAddress = await factoryInstance.getPair(
   //     wethInstance.address,
   //     gtbInstance.address
   // );
   // console.log(`Liquidity pool at address: ${boa_gta_lpAddress}`);
   //
   // //Get Block TimeStamp
   // const blockTime = (await ethers.provider.getBlock()).timestamp;
   //
   // //Add Liquidity
   // console.log(`Adding addLiquidityETH...`);
   // await routerInstance.addLiquidityETH(
   //     gtaInstance.address,
   //     '1000000000000000000000',
   //     '100000000000000000000',
   //     '100000000000000000000',
   //     deployerAddress,
   //     blockTime + 100,
   //     {value: '1000000000000000000000'}
   // );
   // console.log(`done addLiquidityETH...`);
}

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
       console.error(error);
       process.exit(1);
    });

