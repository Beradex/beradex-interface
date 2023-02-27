import { Token, Price, CurrencyAmount } from '@uniswap/sdk-core'
import { InsufficientInputAmountError } from '../errors'
import { computePairAddress, Pair } from './pair'
import { WETH9 } from 'constants/native-token'

describe('computePairAddress', () => {
  it('should correctly compute the pool address', () => {
    const tokenA = new Token(1, '0xb292AF88cd6707508519399A8e0634751C395D58', 18, 'BRDX', 'USD Coin')
    const tokenB = new Token(1, '0x7F5bc2250ea57d8ca932898297b1FF9aE1a04999', 18, 'WETH', 'WETH Stablecoin')
    const result = computePairAddress({
      factoryAddress: '0x6985EaB514E41C767d78CF72CD588bB168c6CD46',
      tokenA,
      tokenB,
    })

    //Crypzoh: We also changed the hash, so need to overwrite this now
    expect(result).toEqual('0x0167a9a24dD3fb8aCbF5D4F44D776722808D204D')
  })
  it('should give same result regardless of token order', () => {
    const BRDX = new Token(1, '0xb292AF88cd6707508519399A8e0634751C395D58', 18, 'BRDX', 'USD Coin')
    const WETH = new Token(1, '0x7F5bc2250ea57d8ca932898297b1FF9aE1a04999', 18, 'WETH', 'WETH Stablecoin')
    let tokenA = BRDX
    let tokenB = WETH
    const resultA = computePairAddress({
      factoryAddress: '0x6985EaB514E41C767d78CF72CD588bB168c6CD46',
      tokenA,
      tokenB,
    })

    tokenA = WETH
    tokenB = BRDX
    const resultB = computePairAddress({
      factoryAddress: '0x6985EaB514E41C767d78CF72CD588bB168c6CD46',
      tokenA,
      tokenB,
    })

    expect(resultA).toEqual(resultB)
  })
})

describe('Pair', () => {
  const BRDX = new Token(1, '0xb292AF88cd6707508519399A8e0634751C395D58', 18, 'BRDX', 'USD Coin')
  const WETH = new Token(1, '0x7F5bc2250ea57d8ca932898297b1FF9aE1a04999', 18, 'WETH', 'WETH Stablecoin')

  describe('constructor', () => {
    it('cannot be used for tokens on different chains', () => {
      expect(
        () => new Pair(CurrencyAmount.fromRawAmount(BRDX, '100'), CurrencyAmount.fromRawAmount(WETH9[421613], '100'))
      ).toThrow('CHAIN_IDS')
    })
  })

  describe.skip('#getAddress', () => {
    it('returns the correct address', () => {
      expect(Pair.getAddress(BRDX, WETH)).toEqual('0x0167a9a24dD3fb8aCbF5D4F44D776722808D204D')
    })
  })

  describe('#token0', () => {
    it('always is the token that sorts before', () => {
      expect(
        new Pair(CurrencyAmount.fromRawAmount(BRDX, '100'), CurrencyAmount.fromRawAmount(WETH, '100')).token0
      ).toEqual(WETH)
      expect(
        new Pair(CurrencyAmount.fromRawAmount(WETH, '100'), CurrencyAmount.fromRawAmount(BRDX, '100')).token0
      ).toEqual(WETH)
    })
  })
  describe('#token1', () => {
    it('always is the token that sorts after', () => {
      expect(
        new Pair(CurrencyAmount.fromRawAmount(BRDX, '100'), CurrencyAmount.fromRawAmount(WETH, '100')).token1
      ).toEqual(BRDX)
      expect(
        new Pair(CurrencyAmount.fromRawAmount(WETH, '100'), CurrencyAmount.fromRawAmount(BRDX, '100')).token1
      ).toEqual(BRDX)
    })
  })
  describe('#reserve0', () => {
    it('always comes from the token that sorts before', () => {
      expect(
        new Pair(CurrencyAmount.fromRawAmount(BRDX, '100'), CurrencyAmount.fromRawAmount(WETH, '101')).reserve0
      ).toEqual(CurrencyAmount.fromRawAmount(WETH, '101'))
      expect(
        new Pair(CurrencyAmount.fromRawAmount(WETH, '101'), CurrencyAmount.fromRawAmount(BRDX, '100')).reserve0
      ).toEqual(CurrencyAmount.fromRawAmount(WETH, '101'))
    })
  })
  describe('#reserve1', () => {
    it('always comes from the token that sorts after', () => {
      expect(
        new Pair(CurrencyAmount.fromRawAmount(BRDX, '100'), CurrencyAmount.fromRawAmount(WETH, '101')).reserve1
      ).toEqual(CurrencyAmount.fromRawAmount(BRDX, '100'))
      expect(
        new Pair(CurrencyAmount.fromRawAmount(WETH, '101'), CurrencyAmount.fromRawAmount(BRDX, '100')).reserve1
      ).toEqual(CurrencyAmount.fromRawAmount(BRDX, '100'))
    })
  })

  describe('#token0Price', () => {
    it('returns price of token0 in terms of token1', () => {
      expect(
        new Pair(CurrencyAmount.fromRawAmount(BRDX, '101'), CurrencyAmount.fromRawAmount(WETH, '100')).token0Price
      ).toEqual(new Price(WETH, BRDX, '100', '101'))
      expect(
        new Pair(CurrencyAmount.fromRawAmount(WETH, '100'), CurrencyAmount.fromRawAmount(BRDX, '101')).token0Price
      ).toEqual(new Price(WETH, BRDX, '100', '101'))
    })
  })

  describe('#token1Price', () => {
    it('returns price of token1 in terms of token0', () => {
      expect(
        new Pair(CurrencyAmount.fromRawAmount(BRDX, '101'), CurrencyAmount.fromRawAmount(WETH, '100')).token1Price
      ).toEqual(new Price(BRDX, WETH, '101', '100'))
      expect(
        new Pair(CurrencyAmount.fromRawAmount(WETH, '100'), CurrencyAmount.fromRawAmount(BRDX, '101')).token1Price
      ).toEqual(new Price(BRDX, WETH, '101', '100'))
    })
  })

  describe('#priceOf', () => {
    const pair = new Pair(CurrencyAmount.fromRawAmount(BRDX, '101'), CurrencyAmount.fromRawAmount(WETH, '100'))
    it('returns price of token in terms of other token', () => {
      expect(pair.priceOf(WETH)).toEqual(pair.token0Price)
      expect(pair.priceOf(BRDX)).toEqual(pair.token1Price)
    })

    it('throws if invalid token', () => {
      expect(() => pair.priceOf(WETH9[421613])).toThrow('TOKEN')
    })
  })

  describe('#reserveOf', () => {
    it('returns reserves of the given token', () => {
      expect(
        new Pair(CurrencyAmount.fromRawAmount(BRDX, '100'), CurrencyAmount.fromRawAmount(WETH, '101')).reserveOf(BRDX)
      ).toEqual(CurrencyAmount.fromRawAmount(BRDX, '100'))
      expect(
        new Pair(CurrencyAmount.fromRawAmount(WETH, '101'), CurrencyAmount.fromRawAmount(BRDX, '100')).reserveOf(BRDX)
      ).toEqual(CurrencyAmount.fromRawAmount(BRDX, '100'))
    })

    it('throws if not in the pair', () => {
      expect(() =>
        new Pair(CurrencyAmount.fromRawAmount(WETH, '101'), CurrencyAmount.fromRawAmount(BRDX, '100')).reserveOf(
          WETH9[421613]
        )
      ).toThrow('TOKEN')
    })
  })

  describe('#chainId', () => {
    it('returns the token0 chainId', () => {
      expect(
        new Pair(CurrencyAmount.fromRawAmount(BRDX, '100'), CurrencyAmount.fromRawAmount(WETH, '100')).chainId
      ).toEqual(1)
      expect(
        new Pair(CurrencyAmount.fromRawAmount(WETH, '100'), CurrencyAmount.fromRawAmount(BRDX, '100')).chainId
      ).toEqual(1)
    })
  })
  describe('#involvesToken', () => {
    expect(
      new Pair(CurrencyAmount.fromRawAmount(BRDX, '100'), CurrencyAmount.fromRawAmount(WETH, '100')).involvesToken(BRDX)
    ).toEqual(true)
    expect(
      new Pair(CurrencyAmount.fromRawAmount(BRDX, '100'), CurrencyAmount.fromRawAmount(WETH, '100')).involvesToken(WETH)
    ).toEqual(true)
    expect(
      new Pair(CurrencyAmount.fromRawAmount(BRDX, '100'), CurrencyAmount.fromRawAmount(WETH, '100')).involvesToken(
        WETH9[421613]
      )
    ).toEqual(false)
  })
  describe('miscellaneous', () => {
    it('getLiquidityMinted:0', async () => {
      const tokenA = new Token(1, '0x0000000000000000000000000000000000000001', 18)
      const tokenB = new Token(1, '0x0000000000000000000000000000000000000002', 18)
      const pair = new Pair(CurrencyAmount.fromRawAmount(tokenA, '0'), CurrencyAmount.fromRawAmount(tokenB, '0'))

      expect(() => {
        pair.getLiquidityMinted(
          CurrencyAmount.fromRawAmount(pair.liquidityToken, '0'),
          CurrencyAmount.fromRawAmount(tokenA, '1000'),
          CurrencyAmount.fromRawAmount(tokenB, '1000')
        )
      }).toThrow(InsufficientInputAmountError)

      expect(() => {
        pair.getLiquidityMinted(
          CurrencyAmount.fromRawAmount(pair.liquidityToken, '0'),
          CurrencyAmount.fromRawAmount(tokenA, '1000000'),
          CurrencyAmount.fromRawAmount(tokenB, '1')
        )
      }).toThrow(InsufficientInputAmountError)

      const liquidity = pair.getLiquidityMinted(
        CurrencyAmount.fromRawAmount(pair.liquidityToken, '0'),
        CurrencyAmount.fromRawAmount(tokenA, '1001'),
        CurrencyAmount.fromRawAmount(tokenB, '1001')
      )

      expect(liquidity.quotient.toString()).toEqual('1')
    })

    it('getLiquidityMinted:!0', async () => {
      const tokenA = new Token(1, '0x0000000000000000000000000000000000000001', 18)
      const tokenB = new Token(1, '0x0000000000000000000000000000000000000002', 18)
      const pair = new Pair(
        CurrencyAmount.fromRawAmount(tokenA, '10000'),
        CurrencyAmount.fromRawAmount(tokenB, '10000')
      )

      expect(
        pair
          .getLiquidityMinted(
            CurrencyAmount.fromRawAmount(pair.liquidityToken, '10000'),
            CurrencyAmount.fromRawAmount(tokenA, '2000'),
            CurrencyAmount.fromRawAmount(tokenB, '2000')
          )
          .quotient.toString()
      ).toEqual('2000')
    })

    it('getLiquidityValue:!feeOn', async () => {
      const tokenA = new Token(1, '0x0000000000000000000000000000000000000001', 18)
      const tokenB = new Token(1, '0x0000000000000000000000000000000000000002', 18)
      const pair = new Pair(CurrencyAmount.fromRawAmount(tokenA, '1000'), CurrencyAmount.fromRawAmount(tokenB, '1000'))

      {
        const liquidityValue = pair.getLiquidityValue(
          tokenA,
          CurrencyAmount.fromRawAmount(pair.liquidityToken, '1000'),
          CurrencyAmount.fromRawAmount(pair.liquidityToken, '1000'),
          false
        )
        expect(liquidityValue.currency.equals(tokenA)).toBe(true)
        expect(liquidityValue.quotient.toString()).toBe('1000')
      }

      // 500
      {
        const liquidityValue = pair.getLiquidityValue(
          tokenA,
          CurrencyAmount.fromRawAmount(pair.liquidityToken, '1000'),
          CurrencyAmount.fromRawAmount(pair.liquidityToken, '500'),
          false
        )
        expect(liquidityValue.currency.equals(tokenA)).toBe(true)
        expect(liquidityValue.quotient.toString()).toBe('500')
      }

      // tokenB
      {
        const liquidityValue = pair.getLiquidityValue(
          tokenB,
          CurrencyAmount.fromRawAmount(pair.liquidityToken, '1000'),
          CurrencyAmount.fromRawAmount(pair.liquidityToken, '1000'),
          false
        )
        expect(liquidityValue.currency.equals(tokenB)).toBe(true)
        expect(liquidityValue.quotient.toString()).toBe('1000')
      }
    })

    it('getLiquidityValue:feeOn', async () => {
      const tokenA = new Token(1, '0x0000000000000000000000000000000000000001', 18)
      const tokenB = new Token(1, '0x0000000000000000000000000000000000000002', 18)
      const pair = new Pair(CurrencyAmount.fromRawAmount(tokenA, '1000'), CurrencyAmount.fromRawAmount(tokenB, '1000'))

      const liquidityValue = pair.getLiquidityValue(
        tokenA,
        CurrencyAmount.fromRawAmount(pair.liquidityToken, '500'),
        CurrencyAmount.fromRawAmount(pair.liquidityToken, '500'),
        true,
        '250000' // 500 ** 2
      )
      expect(liquidityValue.currency.equals(tokenA)).toBe(true)
      expect(liquidityValue.quotient.toString()).toBe('917') // ceiling(1000 - (500 * (1 / 6)))
    })
  })
})
