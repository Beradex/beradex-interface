import { Canto } from './tokens'

describe('Ether', () => {
  it('static constructor uses cache', () => {
    expect(Canto.onChain(1) === Canto.onChain(1)).toEqual(true)
  })
  it('caches once per chain ID', () => {
    expect(Canto.onChain(1) !== Canto.onChain(2)).toEqual(true)
  })
  it('#equals returns false for diff chains', () => {
    expect(Canto.onChain(1).equals(Canto.onChain(2))).toEqual(false)
  })
  it('#equals returns true for same chains', () => {
    expect(Canto.onChain(1).equals(Canto.onChain(1))).toEqual(true)
  })
})
