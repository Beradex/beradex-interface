import { Token } from '@uniswap/sdk-core'
import { WETH, Ether } from './native-token'
import { ChainId } from 'constants/chains'
import { TESTNET } from './periphery'
/* import { MAINNET, TESTNET } from './periphery' */

export { WETH, Ether }

export const ETHER = Ether.onChain(ChainId.MAINNET)

/* export const WETH = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0x826551890Dc65655a0Aceca109aB11AbDbD7a07B',
    18,
    'WBERA',
    'Wrapped Ether'
  ),
} */

export const NOTE = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x4e71A2E537B7f9D9413D3991D37958c0b5e1e503', 18, 'NOTE', 'Note'),
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
}

/**
 * ------------ IBC Tokens
 */

export const tTOKEN = makeToken('tTOKEN', 'tTOKEN', 18, {
  [ChainId.MAINNET]: '0x13Cf938Dd391B5b4f312cf85DeAFEca3d16Ee73B',
  [ChainId.TESTNET]: TESTNET.diffusion || '0x067eC87844fBD73eDa4a1059F30039584586e09d',
  // Minichef Main Reward
  [ChainId.RINKEBY]: '0x655dfdd82cb10dc7fb931fd85d69887756b922fd',
})

export const XDIFF = makeToken('XDIFF', 'XDIFF', 18, {
  [ChainId.MAINNET]: '0x3f75ceabCDfed1aCa03257Dc6Bdc0408E2b4b026',
  [ChainId.TESTNET]: TESTNET.diffusion || '0x067eC87844fBD73eDa4a1059F30039584586e09d',
  // Minichef Main Reward
  [ChainId.RINKEBY]: '0x655dfdd82cb10dc7fb931fd85d69887756b922fd',
})
/*
export const BERA = makeToken('BERA', 'BERA', 9, {
  //@TODO: FIX MAINNET
  [ChainId.MAINNET]: '',
  [ChainId.TESTNET]: TESTNET.testBERA,
  [ChainId.RINKEBY]: '',
})

export const XDIFFUSION = makeToken('xDiffusion', 'XDIFF', 18, {
  [ChainId.MAINNET]: MAINNET.diffusionbar,
  [ChainId.TESTNET]: TESTNET.diffusionbar,
  [ChainId.RINKEBY]: *@TODO: WRONG * '0x655dfdd82cb10dc7fb931fd85d69887756b922fd',
})
*/
function makeToken(name: string, symbol: string, decimals: number, addresses: Record<ChainId, string>) {
  return {
    [ChainId.MAINNET]: new Token(ChainId.MAINNET, addresses[ChainId.MAINNET], decimals, symbol, name),
    [ChainId.TESTNET]: new Token(ChainId.TESTNET, addresses[ChainId.TESTNET], decimals, `${symbol}`, `Test ${name}`),
    [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, addresses[ChainId.TESTNET], decimals, `M${symbol}`, `Mock ${name}`),
  }
}
