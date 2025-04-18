import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

// Define environment files per chain
const networks: Record<string, string> = {
  HARDHAT: 'env.hardhat',
  STANDALONE: '.env',
  MAINNET: '.env.mainnet',
  SEPOLIA: '.env.sepolia',
  BIZTESTNET: '.env.biztestnet',
  BIZDEVNET: '.env.bizdevnet',
  BIZNET: '.env.biznet',
}

const marigoldNetworks: Record<string, string> = {
  MARIGOLD: '.env.marigold',
  MARIGOLD_LOCALNET: '.env.marigold.localnet',
}

const ALL_NETWORKS = { ...networks, ...marigoldNetworks }

// Keys and corresponding env-variable names
const addressKeys = ['WETH', 'factory', 'routerv2', 'multicall', 'bridge', 'tokenBridge', 'token1', 'token2'] as const
const envKeysDefault = [
  'WETH_ADDRESS',
  'FACTORY_ADDRESS',
  'ROUTER_ADDRESS',
  'MULTICALL_ADDRESS',
  'BOA_COIN_BRIDGE',
  'TOKEN_BRIDGE',
  'GTOKEN_ADDRESS',
  'ETOKEN_ADDRESS',
]
const envKeysMarigold = [
  'WETH_ADDRESS',
  'FACTORY_ADDRESS',
  'ROUTER_ADDRESS',
  'MULTICALL_ADDRESS',
  'BOA_TOKEN_BRIDGE',
  'TOKEN_BRIDGE',
  'GTOKEN_ADDRESS',
  'ETOKEN_ADDRESS',
]

// Prepare output lines
const resultLines: string[] = []
resultLines.push(`import { ChainId } from './core'`)
resultLines.push('')
resultLines.push('export const CONTRACT_ADDRESS_NETWORKS = {')

// Default fallback for missing env-vars
const generateDefaultAddress = (chain: string, key: string) =>
  `0x${Buffer.from(`${chain}_${key}`).toString('hex').slice(0, 40).padEnd(40, '0')}`

// Build the network mappings
for (const [chainName, envFile] of Object.entries(ALL_NETWORKS)) {
  const isMarigold = chainName.startsWith('MARIGOLD')
  const envPath = path.resolve(__dirname, '../..', envFile)

  let envData: Record<string, string> = {}
  try {
    const raw = fs.readFileSync(envPath)
    envData = dotenv.parse(raw)
  } catch {
    console.warn(`⚠️  No env file for ${chainName}, using defaults`)
  }

  const envKeys = isMarigold ? envKeysMarigold : envKeysDefault
  resultLines.push(`  [ChainId.${chainName}]: {`)

  addressKeys.forEach((key, i) => {
    const envKey = envKeys[i]
    const value = envData[envKey] || generateDefaultAddress(chainName, key)
    resultLines.push(`    ${key}: '${value}',`)
  })

  resultLines.push('  },')
}

resultLines.push('} as const')
resultLines.push('')

// Generate FACTORY_ADDRESS for core networks
const factoryChains = ['MAINNET', 'HARDHAT', 'STANDALONE', 'SEPOLIA', 'BIZTESTNET', 'BIZDEVNET', 'BIZNET']
resultLines.push('export const FACTORY_ADDRESS: { [key: string]: string } = {')
factoryChains.forEach((chain, idx) => {
  const comma = idx < factoryChains.length - 1 ? ',' : ''
  resultLines.push(`  [ChainId.${chain}]: CONTRACT_ADDRESS_NETWORKS[ChainId.${chain}].factory${comma}`)
})
resultLines.push('}')

// Write to constants.ts
const outPath = path.resolve(__dirname, '../src/constants.ts')
fs.writeFileSync(outPath, resultLines.join('\n'))
console.log(`✅ Contract addresses written to ${outPath}`)
