/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomiclabs/hardhat-ethers');
require('dotenv').config({ 
   path: require('path').resolve(__dirname, '..', process.env.ENV_FILE || ".env") 
});

module.exports = {
   defaultNetwork: 'hardhat',
   networks: {
      hardhat: {},
      testnet: {
         url: process.env.TESTNET_URL,
         accounts: [process.env.ADMIN_KEY],
         chainId: parseInt(process.env.TESTNET_CHAIN_ID),
      },
      devnet: {
         url: process.env.DEVNET_URL,
         accounts: [process.env.ADMIN_KEY],
         chainId: parseInt(process.env.DEVNET_CHAIN_ID),
      },
      marigold: {
         url: process.env.MARIGOLD_URL,
         accounts: [process.env.ADMIN_KEY],
         chainId: parseInt(process.env.MARIGOLD_CHAIN_ID),
      },
      marigoldlocalnet: {
         url: process.env.MARIGOLD_LOCALNET_URL,
         accounts: [process.env.ADMIN_KEY],
         chainId: parseInt(process.env.MARIGOLD_LOCALNET_CHAIN_ID),
      },
      localnet: {
         url: process.env.LOCALNET_URL,
         accounts: [process.env.ADMIN_KEY],
         chainId: parseInt(process.env.LOCALNET_CHAIN_ID),
      },
   },
   solidity: {
      compilers: [
         {
            version: '0.5.16',
            settings: {
               optimizer: {
                  enabled: true,
                  runs: 200,
               },
            },
         },
         {
            version: '0.6.6',
            settings: {
               optimizer: {
                  enabled: true,
                  runs: 200,
               },
            },
         }
      ],
   },
   paths: {
      sources: './contracts',
      cache: './cache',
      artifacts: './artifacts',
   },
   mocha: {
      timeout: 20000,
   },
};
