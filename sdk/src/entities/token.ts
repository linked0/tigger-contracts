import invariant from 'tiny-invariant'
import { ChainId } from '../core'
import { CONTRACT_ADDRESS_NETWORKS } from '../constants'
import { validateAndParseAddress } from '../utils'
import { Currency } from './currency'
/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends Currency {
  public readonly chainId: ChainId
  public readonly address: string

  public constructor(chainId: ChainId, address: string, decimals: number, symbol?: string, name?: string) {
    super(decimals, symbol, name)
    this.chainId = chainId
    this.address = validateAndParseAddress(address)
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Token): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    return this.chainId === other.chainId && this.address === other.address
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof Token) {
    return false
  } else if (currencyB instanceof Token) {
    return false
  } else {
    return currencyA === currencyB
  }
}

export const WDEV = {
  [ChainId.HARDHAT]: new Token(
    ChainId.HARDHAT,
    CONTRACT_ADDRESS_NETWORKS[ChainId.HARDHAT].WETH,
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.STANDALONE]: new Token(
    ChainId.STANDALONE,
    CONTRACT_ADDRESS_NETWORKS[ChainId.STANDALONE].WETH,
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    CONTRACT_ADDRESS_NETWORKS[ChainId.MAINNET].WETH,
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.SEPOLIA]: new Token(
    ChainId.SEPOLIA,
    CONTRACT_ADDRESS_NETWORKS[ChainId.SEPOLIA].WETH,
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.MARIGOLD]: new Token(
    ChainId.MARIGOLD,
    CONTRACT_ADDRESS_NETWORKS[ChainId.MARIGOLD].WETH,
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.MARIGOLD_LOCALNET]: new Token(
    ChainId.MARIGOLD_LOCALNET,
    CONTRACT_ADDRESS_NETWORKS[ChainId.MARIGOLD_LOCALNET].WETH,
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.BIZTESTNET]: new Token(
    ChainId.BIZTESTNET,
    CONTRACT_ADDRESS_NETWORKS[ChainId.BIZTESTNET].WETH,
    18,
    'BOA',
    'BOSAGORA'
  ),
  [ChainId.BIZDEVNET]: new Token(
    ChainId.BIZDEVNET,
    CONTRACT_ADDRESS_NETWORKS[ChainId.BIZDEVNET].WETH,
    18,
    'BOA',
    'BOSAGORA'
  ),
  [ChainId.BIZNET]: new Token(ChainId.BIZNET, CONTRACT_ADDRESS_NETWORKS[ChainId.BIZNET].WETH, 18, 'BOA', 'BOSAGORA')
}
