// a list of tokens by chain
import { Token } from '@uniswap/sdk-core'
import { USDC, ETHER, HONEY, WETH, BRDX } from './tokens'
import { ChainId } from './chains'
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [ChainId.MAINNET]: pickNetwork([ETHER, WETH, HONEY, BRDX] as any, ChainId.MAINNET),
  [ChainId.TESTNET]: pickNetwork([USDC, BRDX], ChainId.TESTNET),
  [ChainId.RINKEBY]: pickNetwork([USDC], ChainId.RINKEBY),
  [ChainId.HARDHAT]: pickNetwork([USDC], ChainId.HARDHAT),
}
export const ADDITIONAL_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: Partial<ChainTokenList> = {
  [ChainId.MAINNET]: pickNetwork([BRDX, WETH] as any, ChainId.MAINNET),
  [ChainId.TESTNET]: pickNetwork([USDC, WETH, BRDX], ChainId.TESTNET),
  [ChainId.HARDHAT]: pickNetwork([USDC, WETH], ChainId.HARDHAT),
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  [ChainId.MAINNET]: pickNetwork([ETHER, BRDX] as any, ChainId.MAINNET),
  [ChainId.TESTNET]: pickNetwork([USDC, WETH, BRDX], ChainId.TESTNET),
  [ChainId.RINKEBY]: pickNetwork([USDC], ChainId.RINKEBY),
  [ChainId.HARDHAT]: pickNetwork([USDC, WETH], ChainId.HARDHAT),
}
export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  //@TODO: Check where this is used
  [ChainId.MAINNET]: [
    // [
    //   new Token(ChainId.MAINNET, '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643', 8, 'cDAI', 'Compound Dai'),
    //   new Token(ChainId.MAINNET, '0x39AA39c021dfbaE8faC545936693aC917d5E7563', 8, 'cUSDC', 'Compound USD Coin'),
    // ],
    // [USDC, USDT],
    // [DAI, USDT],
  ],
}

function pickNetwork(tokens: Array<Record<ChainId, Token>>, chainId: ChainId) {
  return tokens.map((a) => a[chainId])
}
