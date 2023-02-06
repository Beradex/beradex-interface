import { Token } from '@uniswap/sdk-core'
import { WETH, Ether } from './native-token'
import { ChainId } from 'constants/chains'
import { HARDHAT, MAINNET, TESTNET } from './periphery'

export { WETH, Ether }

export const ETHER = Ether.onChain(ChainId.MAINNET)
// export const BERA = Ether.onChain(ChainId.TESTNET)

/* export const WETH = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0x826551890Dc65655a0Aceca109aB11AbDbD7a07B',
    18,
    'WBERA',
    'Wrapped Ether'
  ),
} */

export const HONEY = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x7a721f5330f0d3079EbDf77da01771cEf9B97ae7', 18, 'HONEY', 'HONEY'),
  [ChainId.TESTNET]: new Token(ChainId.TESTNET, '0x7a721f5330f0d3079EbDf77da01771cEf9B97ae7', 18, 'tHONEY', 'tHONEY'),
  [ChainId.HARDHAT]: new Token(ChainId.HARDHAT, '0x7a721f5330f0d3079EbDf77da01771cEf9B97ae7', 18, 'tHONEY', 'tHONEY'),
}

export const ETH = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x5FD55A1B9FC24967C4dB09C513C3BA0DFa7FF687', 18, 'ETH', 'Ethereum'),
}

export const ATOM = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0xecEEEfCEE421D8062EF8d6b4D814efe4dc898265', 6, 'ATOM', 'Cosmos'),
}

export const USDT = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0xd567B3d7B8FE3C79a1AD8dA978812cfC4Fa05e75', 6, 'USDT', 'USDT'),
}

export const USDC = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x398E4948e373Db819606A459456176D31C3B1F91', 6, 'USDC', 'USDC Coin'),
  [ChainId.TESTNET]: new Token(ChainId.TESTNET, TESTNET.testUSDC, 18, 'tUSDC', 'Test USD'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0xB2E91f27a9766bFD925D66D88B78D2cE64a846b6', 18, 'MUSDC', 'Mock USDC'),
  [ChainId.HARDHAT]: new Token(ChainId.HARDHAT, HARDHAT.testUSDC, 18, 'MUSDC', 'Mock USDC'),
}

/**
 * ------------ IBC Tokens
 */

export const BRDX = makeToken('BRDX', 'BRDX', 18, {
  [ChainId.MAINNET]: '0x62a4256536eA5E17E5c3F489eA68F27d2A64eb81',
  [ChainId.TESTNET]: TESTNET.beradextoken || '0xb292AF88cd6707508519399A8e0634751C395D58',
  // Minichef Main Reward
  [ChainId.RINKEBY]: '0x655dfdd82cb10dc7fb931fd85d69887756b922fd',
  [ChainId.HARDHAT]: HARDHAT.beradextoken || '0x13Cf938Dd391B5b4f312cf85DeAFEca3d16Ee73B',
})

export const XBRDX = makeToken('xBRDX', 'XBRDX', 18, {
  [ChainId.MAINNET]: MAINNET.xbrdx,
  [ChainId.TESTNET]: TESTNET.xbrdx,
  [ChainId.RINKEBY]: '',
  [ChainId.HARDHAT]: HARDHAT.xbrdx,
})

function makeToken(name: string, symbol: string, decimals: number, addresses: Record<ChainId, string>) {
  return {
    [ChainId.MAINNET]: new Token(ChainId.MAINNET, addresses[ChainId.MAINNET], decimals, symbol, name),
    [ChainId.TESTNET]: new Token(ChainId.TESTNET, addresses[ChainId.TESTNET], decimals, `${symbol}`, `Test ${name}`),
    [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, addresses[ChainId.TESTNET], decimals, `M${symbol}`, `Mock ${name}`),
    [ChainId.HARDHAT]: new Token(ChainId.HARDHAT, addresses[ChainId.HARDHAT], decimals, `${symbol}`, `Test ${name}`),
  }
}
