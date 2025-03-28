import JSBI from 'jsbi'

import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'

// Load base .env for STANDALONE and others
const standalonePath = path.join(__dirname, '../../.env')
const standaloneEnv = dotenv.config({ path: standalonePath }).parsed || {}

// Load MARIGOLD environment variables separately
const marigoldPath = path.join(__dirname, '../../.env.marigold')
const marigoldEnv = dotenv.parse(fs.readFileSync(marigoldPath))

// Load MARIGOLD Localnet environment variables separately
const mariLocalPath = path.join(__dirname, '../../.env.marigold.localnet')
const mariLocalEnv = dotenv.parse(fs.readFileSync(mariLocalPath))

// exports for external consumption
export type BigintIsh = JSBI | bigint | string

export enum ChainId {
  HARDHAT = 31337,
  STANDALONE = 7212309,
  MAINNET = 1,
  SEPOLIA = 11155111,
  MARIGOLD = 12301,
  MARIGOLD_LOCALNET = 12309,
  BIZTESTNET = 7212303,
  BIZDEVNET = 7212302,
  BIZNET = 7212301
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}

type DeployedContract = {
  WETH: string
  factory: string
  routerv2: string
  multicall: string
  bridge: string
  tokenBridge: string
}
export const CONTRACT_ADDRESS_NETWORKS: { [chainId in ChainId]: DeployedContract } = {
  [ChainId.MAINNET]: {
    WETH: '0xC2Bf5F29a4384b1aB0C063e1c666f02121B6084a',
    factory: '0x5c4242beB94dE30b922f57241f1D02f36e906915',
    routerv2: '0x42e2EE7Ba8975c473157634Ac2AF4098190fc741',
    multicall: '0xF8cef78E923919054037a1D03662bBD884fF4edf',
    bridge: '0x95075eDc815e9Cd62Ff6D4598ea922307416B452',
    tokenBridge: '0x95075eDc815e9Cd62Ff6D4598ea922307416B452'
  },
  [ChainId.HARDHAT]: {
    WETH: '0xC2Bf5F29a4384b1aB0C063e1c666f02121B6084a',
    factory: '0x5c4242beB94dE30b922f57241f1D02f36e906915',
    routerv2: '0x42e2EE7Ba8975c473157634Ac2AF4098190fc741',
    multicall: '0xF8cef78E923919054037a1D03662bBD884fF4edf',
    bridge: '0x95075eDc815e9Cd62Ff6D4598ea922307416B452',
    tokenBridge: '0x95075eDc815e9Cd62Ff6D4598ea922307416B452'
  },
  [ChainId.STANDALONE]: {
    WETH: standaloneEnv.WETH_ADDRESS,
    factory: standaloneEnv.FACTORY_ADDRESS,
    routerv2: standaloneEnv.ROUTER_ADDRESS,
    multicall: standaloneEnv.MULTICALL_ADDRESS,
    bridge: standaloneEnv.BOA_TOKEN_BRIDGE,
    tokenBridge: standaloneEnv.TOKEN_BRIDGE
  },
  [ChainId.SEPOLIA]: {
    WETH: '0xA0be228CA989c4225682EbfaF1a372298993bdB9',
    factory: '0x96BfB45907879216CF504E81aFB2948048249A12',
    routerv2: '0x761d69Ba08C571AE2247be65f42e79E4126ae4DF',
    multicall: '0x5869297F41dD79Df34818c5f00a0814933657309',
    bridge: '0x95075eDc815e9Cd62Ff6D4598ea922307416B452',
    tokenBridge: '0x95075eDc815e9Cd62Ff6D4598ea922307416B452'
  },
  [ChainId.MARIGOLD]: {
    WETH: marigoldEnv.WETH_ADDRESS,
    factory: marigoldEnv.FACTORY_ADDRESS,
    routerv2: marigoldEnv.ROUTER_ADDRESS,
    multicall: marigoldEnv.MULTICALL_ADDRESS,
    bridge: marigoldEnv.BOA_TOKEN_BRIDGE,
    tokenBridge: marigoldEnv.TOKEN_BRIDGE
  },
  [ChainId.MARIGOLD_LOCALNET]: {
    WETH: mariLocalEnv.WETH_ADDRESS,
    factory: mariLocalEnv.FACTORY_ADDRESS,
    routerv2: mariLocalEnv.ROUTER_ADDRESS,
    multicall: mariLocalEnv.MULTICALL_ADDRESS,
    bridge: mariLocalEnv.BOA_TOKEN_BRIDGE,
    tokenBridge: mariLocalEnv.TOKEN_BRIDGE
  },
  [ChainId.BIZTESTNET]: {
    WETH: '0x0B102b3b321E0D9983907618eC3b685C83a43184',
    factory: '0x618e0C679b22E84F0A4B7C9B79576Ee56bCA095b',
    routerv2: '0x7aD2c7AC9F01345ff137f79B061CCF6a59459D6E',
    multicall: '0xbD9cffA1ABaEecDD75e197eBC18d12E172ff82E3',
    bridge: '0xADd5a0Fc7b056De0265c26cF7AE13D7c1A852217',
    tokenBridge: '0x6A34A879eD335A6451A4AA2D02852E73DCEF96Ac'
  },
  [ChainId.BIZDEVNET]: {
    WETH: '0x7d72459bD06C487Ea572bF7FDF3Bc4e1a23C8049',
    factory: '0x0e877509F73E3f06c86F1403bf4599329e4f7063',
    routerv2: '0xd1b04bb65b4Ba8D59c35A43E07A45cc694dC2C01',
    multicall: '0xf9cC1E443c237a5A5B16a00ddC43566830BbA768',
    bridge: '0x8C883156799698dF874Cc8Da00DdF971B744D801',
    tokenBridge: '0x309E958ECb54C09094A0Fcd5F3478dB4bC33Babc'
  },
  [ChainId.BIZNET]: {
    WETH: '0xC2Bf5F29a4384b1aB0C063e1c666f02121B6084a',
    factory: '0x5c4242beB94dE30b922f57241f1D02f36e906915',
    routerv2: '0x42e2EE7Ba8975c473157634Ac2AF4098190fc741',
    multicall: '0xF8cef78E923919054037a1D03662bBD884fF4edf',
    bridge: '0x95075eDc815e9Cd62Ff6D4598ea922307416B452',
    tokenBridge: '0x95075eDc815e9Cd62Ff6D4598ea922307416B452'
  }
}

export const FACTORY_ADDRESS: { [key: string]: string } = {
  [ChainId.MAINNET]: CONTRACT_ADDRESS_NETWORKS[ChainId.MAINNET].factory,
  [ChainId.HARDHAT]: CONTRACT_ADDRESS_NETWORKS[ChainId.HARDHAT].factory,
  [ChainId.STANDALONE]: CONTRACT_ADDRESS_NETWORKS[ChainId.STANDALONE].factory,
  [ChainId.SEPOLIA]: CONTRACT_ADDRESS_NETWORKS[ChainId.SEPOLIA].factory,
  [ChainId.BIZTESTNET]: CONTRACT_ADDRESS_NETWORKS[ChainId.BIZTESTNET].factory,
  [ChainId.BIZDEVNET]: CONTRACT_ADDRESS_NETWORKS[ChainId.BIZDEVNET].factory,
  [ChainId.BIZNET]: CONTRACT_ADDRESS_NETWORKS[ChainId.BIZNET].factory
}

export const INIT_CODE_HASH = '0xcdb5c7a94a3b876fbeb290dd258ac954a243df6f3dc0a6ab2568dc6e8e732ad3'

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const _985 = JSBI.BigInt(985)
export const _1000 = JSBI.BigInt(1000)

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256'
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
}
