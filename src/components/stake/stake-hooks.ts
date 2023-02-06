import { BERADEX_STAKING_ADDRESS } from 'constants/addresses'
import { BRDX, XBRDX } from 'constants/tokens'
import { useTotalSupply } from 'hooks/useTotalSupply'
import { useActiveWeb3React } from 'hooks/web3'
import JSBI from 'jsbi'
import { Currency, CurrencyAmount } from 'sdk-core/entities'
import { useTokenBalance } from 'state/wallet/hooks'

const DAILY_EMITTED_BRDX = JSBI.BigInt(0) // BERADEX: CHANGE EMISSIONS/APR
const YEARLY_EMITTED_BRDX = JSBI.multiply(DAILY_EMITTED_BRDX, JSBI.BigInt(365))

export function useEarnedBrdx(xBrdxBalance?: CurrencyAmount<Currency>) {
  const { chainId } = useActiveWeb3React()
  const totalBrdxToDistribute = useTokenBalance(
    chainId ? BERADEX_STAKING_ADDRESS[chainId] : undefined,
    chainId ? BRDX[chainId] : undefined
  )
  const totalXBrdx = useTotalSupply(chainId ? BRDX[chainId] : undefined)

  if (totalXBrdx?.greaterThan('0') && xBrdxBalance) {
    return totalBrdxToDistribute?.multiply(xBrdxBalance).divide(totalXBrdx)
  }
  return undefined
}

export function useStakingAPY() {
  const { chainId } = useActiveWeb3React()

  const yearlyEmission = chainId
    ? CurrencyAmount.fromRawAmount(BRDX[chainId], YEARLY_EMITTED_BRDX).multiply(JSBI.BigInt(10 ** 18))
    : undefined

  console.log('yearlyEmission', yearlyEmission?.toSignificant())

  const totalXBrdx = useTotalSupply(chainId ? XBRDX[chainId] : undefined)
  console.log('TotalXBrdx', totalXBrdx?.toSignificant())
  if (yearlyEmission && totalXBrdx && JSBI.greaterThan(totalXBrdx.quotient, JSBI.BigInt('0'))) {
    return JSBI.divide(JSBI.multiply(yearlyEmission.quotient, JSBI.BigInt(100)), totalXBrdx.quotient)
  }
  return undefined
}
