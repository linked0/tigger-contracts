import { JsonRpcProvider, Wallet, Contract } from 'ethers'
import fs from 'fs'
import { resolve } from 'path';
import dotenv from 'dotenv'
import { CONTRACT_ADDRESS_NETWORKS, ChainId } from '../src/constants'
import WETHArtifact from '../src/abis/WETH.json'

if (!process.env.ADMIN_KEY) {
  console.error('Error: ADMIN_KEY environment variable is not defined. Exiting.')
  process.exit(1)
}

// Create a provider
const providerUrl = process.env.MARIGOLD_LOCALNET_URL
console.log(`Connecting to provider at ${providerUrl}`)
const provider = new JsonRpcProvider(providerUrl)

// Create a wallet from the ADMIN_KEY and extract the address
const wallet = new Wallet(process.env.ADMIN_KEY, provider)
const accountAddress = wallet.address

// Choose the network (e.g., MARIGOLD_LOCALNET) and retrieve its WETH address
const network = ChainId.MARIGOLD_LOCALNET
const wethAddress = CONTRACT_ADDRESS_NETWORKS[network].WETH
console.log(`WETH address on network ${network} is: ${wethAddress}`)

async function main() {
  // Create a contract instance for the WETH token
  const wethContract = new Contract(wethAddress, WETHArtifact.abi, provider)
  
  // Query the balance of the wallet's address; ethers v6 returns a bigint
  const balance: bigint = await wethContract.balanceOf(accountAddress)
  
  console.log(`WETH balance of ${accountAddress} on network ${network} is: ${balance.toString()}`)
}

main().catch((err) => {
  console.error('Error:', err)
})
