import { ChainId } from 'constants/chains'
import { ExplorerDataType, getExplorerLink } from './getExplorerLink'

describe('#getExplorerLink', () => {
  it('correct for tx', () => {
    expect(getExplorerLink(ChainId.MAINNET, 'abc', ExplorerDataType.TRANSACTION)).toEqual(
      'https://evm.evmos.dev/tx/abc'
    )
  })
  it('correct for token', () => {
    expect(getExplorerLink(ChainId.MAINNET, 'abc', ExplorerDataType.TOKEN)).toEqual('https://evm.evmos.dev/token/abc')
  })
  it('correct for address', () => {
    expect(getExplorerLink(ChainId.MAINNET, 'abc', ExplorerDataType.ADDRESS)).toEqual('https://evm.evmos.dev/abc')
  })
  it('unrecognized chain id defaults to mainnet', () => {
    expect(getExplorerLink(2, 'abc', ExplorerDataType.ADDRESS)).toEqual('https://evm.evmos.dev/address/abc')
  })
  it('testnet', () => {
    expect(getExplorerLink(ChainId.TESTNET, 'abc', ExplorerDataType.ADDRESS)).toEqual('https://evm.evmos.dev/abc')
  })
})
