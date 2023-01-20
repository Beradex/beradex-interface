import { WETH } from './tokens'

describe('Ether', () => {
  it('static constructor uses cache', () => {
    expect(WETH.onChain(1) === WETH.onChain(1)).toEqual(true)
  })
  it('caches once per chain ID', () => {
    expect(WETH.onChain(1) !== WETH.onChain(2)).toEqual(true)
  })
  it('#equals returns false for diff chains', () => {
    expect(WETH.onChain(1).equals(WETH.onChain(2))).toEqual(false)
  })
  it('#equals returns true for same chains', () => {
    expect(WETH.onChain(1).equals(WETH.onChain(1))).toEqual(true)
  })
})
