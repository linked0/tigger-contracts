const { ethers } = require('hardhat');

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
   const tokBoa = await ethers.getContractFactory('Token');
   const tokBoaInstance = await tokBoa.deploy('BOAAGORA', 'BOA');
   console.log(`BOAAGORA Token deployed to : ${tokBoaInstance.address}`);

   const gta = await ethers.getContractFactory('Token');
   const gtaInstance = await gta.deploy('A Game Token', 'GT-A');
   console.log(`A Game Token deployed to : ${gtaInstance.address}`);

   const gtb = await ethers.getContractFactory('Token');
   const gtbInstance = await gtb.deploy('B Game Token', 'GT-B');
   console.log(`B Game Token deployed to : ${gtbInstance.address}`);

   /**/
   //Approve router on tokens of gta and gtb
   console.log(`Approving Router on Token1`);
   await tokBoaInstance.approve(
       routerInstance.address,
       '1000000000000000000000000'
   );
   console.log(`Approving Router on Token2`);
   await gtbInstance.approve(
       routerInstance.address,
       '1000000000000000000000000'
   );

   //Create Pair with Factory and Get Address
   await factoryInstance.createPair(tokBoaInstance.address, gtbInstance.address);
   const boa_gta_lpAddress = await factoryInstance.getPair(
       tokBoaInstance.address,
       gtbInstance.address
   );
   console.log(`Liquidity pool at address: ${boa_gta_lpAddress}`);

   //Get Block TimeStamp
   const blockTime = (await ethers.provider.getBlock()).timestamp;

   //Add Liquidity
   console.log(`Adding Liquidity...`);
   await routerInstance.addLiquidity(
       tokBoaInstance.address,
       gtbInstance.address,
       '1000000000000000000000',
       '1000000000000000000000',
       '100000000000000000000',
       '100000000000000000000',
       deployerAddress,
       blockTime + 100
   );
}

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
       console.error(error);
       process.exit(1);
    });

