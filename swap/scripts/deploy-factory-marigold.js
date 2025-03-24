const { ethers } = require('hardhat');

// Deploy function
async function deploy() {
   [account] = await ethers.getSigners();
   deployerAddress = account.address;
   console.log(`Deploying contracts using ${deployerAddress}`);

   //Deploy WETH
   const weth = await ethers.getContractFactory('WETH');
   const wethInstance = await weth.attach(process.env.WETH_ADDRESS);
   console.log(`WETH_ADDRESS=${wethInstance.address}`);

   //Deploy Multicall (needed for Interface)
   const multicall = await ethers.getContractFactory('Multicall');
   const multicallInstance = await multicall.attach(process.env.MULTICALL_ADDRESS);
   console.log(`MULTICALL_ADDRESS=${multicallInstance.address}`);

   //Deploy Factory
   const factory = await ethers.getContractFactory('UniswapV2Factory');
   const factoryInstance = await factory.deploy(deployerAddress);
   await factoryInstance.deployed();
   console.log(`FACTORY_ADDRESS=${factoryInstance.address}`);

   //Deploy Router passing Factory Address and WETH Address
   const router = await ethers.getContractFactory('UniswapV2Router02');
   const routerInstance = await router.deploy(
       factoryInstance.address,
       wethInstance.address
   );
   await routerInstance.deployed();
   console.log(`ROUTER_ADDRESS=${routerInstance.address}`);

   //CalHash
   const calHash = await ethers.getContractFactory('CalHash');
   const calHashInstance = await calHash.deploy();
   await calHashInstance.deployed();
   const hash = await calHashInstance.getInitHash();
   console.log(`CALLHASH_ADDRESS=${hash.toString()}`);

   await factoryInstance.setFeeTo(process.env.FEE_TO);
   const feeTo = await factoryInstance.feeTo()
   console.log(`FEE_TO=${feeTo}`)

   //Deploy Tokens
   const tokBoa = await ethers.getContractFactory('Token');
   const tokBoaInstance = await tokBoa.deploy('BOAAGORA', 'BOA');
   await tokBoaInstance.deployed();
   console.log(`BOA_ADDRESS=${tokBoaInstance.address}`);

   const gta = await ethers.getContractFactory('Token');
   const gtaInstance = await gta.deploy('A Game Token', 'GT-A');
   await gtaInstance.deployed();
   // console.log(`A Game Token deployed to : ${gtaInstance.address}`);
   console.log(`GTOKEN_ADDRESS=${gtaInstance.address}`);

   const gtb = await ethers.getContractFactory('Token');
   const gtbInstance = await gtb.deploy('B Game Token', 'GT-B');
   await gtbInstance.deployed();
   // console.log(`B Game Token deployed to : ${gtbInstance.address}`);
   console.log(`ETOKEN_ADDRESS=${gtbInstance.address}`);

   /**/
   //Approve router on tokens of gta and gtb
   console.log(`Approving Router on Token1`);
   const tokBoaTx = await tokBoaInstance.approve(
       routerInstance.address,
       '1000000000000000000000000'
   );
   await tokBoaTx.wait();

   console.log(`Approving Router on Token2`);
   const gtbTx = await gtbInstance.approve(
       routerInstance.address,
       '1000000000000000000000000'
   );
   await gtbTx.wait();

   // Test for factoryInstance
   console.log(`Factory allPairsLength: ${await factoryInstance.allPairsLength()}`);

   //Create Pair with Factory and Get Address
   const pairAddress= await factoryInstance.createPair(tokBoaInstance.address, gtbInstance.address);
   await pairAddress.wait();
   console.log(`Pair Address: ${pairAddress.toString()}`);
   const boa_gta_lpAddress = await factoryInstance.getPair(
       tokBoaInstance.address,
       gtbInstance.address
   );
   console.log(`Liquidity pool at address: ${boa_gta_lpAddress}`);

   //Get Block TimeStamp
   const blockTime = (await ethers.provider.getBlock()).timestamp;

   //Add Liquidity
   console.log(`Adding Liquidity...`);
   const addLiqTx = await routerInstance.addLiquidity(
       tokBoaInstance.address,
       gtbInstance.address,
       '1000000000000000000000',
       '1000000000000000000000',
       '100000000000000000000',
       '100000000000000000000',
       deployerAddress,
       blockTime + 100
   );
   await addLiqTx.wait();
}

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
       console.error(error);
       process.exit(1);
    });

