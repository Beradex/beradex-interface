import { ChainId } from './chains'
import { Token } from '../sdk-core/entities/token'
import { NativeCurrency } from '../sdk-core/entities/nativeCurrency'
import invariant from 'tiny-invariant'
import { WETH9_ADDRESS } from './addresses'

export const WETH = {
  // Mainly for unit tests
  1: new Token(1, WETH9_ADDRESS[4], 18, 'WBERA', 'Wrapped Bera'),
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, WETH9_ADDRESS[ChainId.MAINNET], 18, 'WBERA', 'Wrapped Bera'),
  [ChainId.TESTNET]: new Token(ChainId.TESTNET, WETH9_ADDRESS[ChainId.TESTNET], 18, 'WBERA', 'Wrapped Bera'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, WETH9_ADDRESS[ChainId.RINKEBY], 18, 'WBERA', 'Wrapped Bera'),
  [ChainId.HARDHAT]: new Token(ChainId.HARDHAT, WETH9_ADDRESS[ChainId.HARDHAT], 18, 'WBERA', 'Wrapped Bera'),
}
export const WETH9 = WETH

export class Ether extends NativeCurrency {
  //please change to Ether: beraDEX
  protected constructor(chainId: number) {
    super(chainId, 18, 'BERA', 'Bera')
  }

  public get wrapped(): Token {
    const weth9 = WETH[this.chainId as ChainId]
    invariant(!!weth9, 'WRAPPED')
    return weth9
  }

  private static _etherCache: { [chainId: number]: Ether } = {}

  public static onChain(chainId: number): Ether {
    return this._etherCache[chainId] ?? (this._etherCache[chainId] = new Ether(chainId))
  }

  public equals(other: NativeCurrency | Token): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}
