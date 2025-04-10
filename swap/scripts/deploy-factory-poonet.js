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
   console.log(`BOA_ADDRESS=${tokBoaInstance.address}`);

   const gta = await ethers.getContractFactory('Token');
   const gtaInstance = await gta.deploy('A Game Token', 'GT-A');
   // console.log(`A Game Token deployed to : ${gtaInstance.address}`);
   console.log(`GTOKEN_ADDRESS=${gtaInstance.address}`);

   const gtb = await ethers.getContractFactory('Token');
   const gtbInstance = await gtb.deploy('B Game Token', 'GT-B');
   // console.log(`B Game Token deployed to : ${gtbInstance.address}`);
   console.log(`ETOKEN_ADDRESS=${gtbInstance.address}`);
}

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
       console.error(error);
       process.exit(1);
    });

