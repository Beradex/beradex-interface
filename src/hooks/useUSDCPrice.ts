import { Currency, CurrencyAmount, Price, Token } from '@uniswap/sdk-core'
import { useMemo } from 'react'
import { USDC } from '../constants/tokens'
import { useV2TradeExactOut } from './useV2Trade'
import { useActiveWeb3React } from './web3'
import { ChainId } from 'constants/chains'

// USDC amount used when calculating spot price for a given currency.
// The amount is large enough to filter low liquidity pairs.
// const usdcCurrencyAmount = CurrencyAmount.fromRawAmount(USDC[ChainId.MAINNET], 100_000e6)
// @TODO: change back, but to bootstrap we dont have enought liquidity
const usdcCurrencyAmount = CurrencyAmount.fromRawAmount(USDC[ChainId.MAINNET], 100e6)

/**
 * Returns the price in USDC of the input currency
 * @param currency currency to compute the USDC price of
 */
export default function useUSDCPrice(currency?: Currency): Price<Currency, Token> | undefined {
  const { chainId } = useActiveWeb3React()

  const v2USDCTrade = useV2TradeExactOut(currency, chainId === ChainId.MAINNET ? usdcCurrencyAmount : undefined, {
    maxHops: 2,
  })

  return useMemo(() => {
    if (!currency || !chainId) {
      return undefined
    }

    // beraDEX: this may influence PriceImpact on FiatValue
    // return some fake price data for non-mainnet
    if (chainId !== ChainId.MAINNET) {
      const fakeUSDC = new Token(chainId, '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8', 6, 'fUSDC', 'Fake USDC')
      return new Price(
        currency,
        fakeUSDC,
        10 ** Math.max(0, currency.decimals - 6),
        1 * 10 ** Math.max(6 - currency.decimals, 0)
      )
    }

    // use v2 price if available, v3 as fallback
    if (v2USDCTrade) {
      const { numerator, denominator } = v2USDCTrade.route.midPrice
      return new Price(currency, USDC[ChainId.MAINNET], denominator, numerator)
    }

    return undefined
  }, [chainId, currency, v2USDCTrade])
}

export function useUSDCValue(currencyAmount: CurrencyAmount<Currency> | undefined | null) {
  const price = useUSDCPrice(currencyAmount?.currency)

  return useMemo(() => {
    if (!price || !currencyAmount) return null
    try {
      return price.quote(currencyAmount)
    } catch (error) {
      return null
    }
  }, [currencyAmount, price])
}
