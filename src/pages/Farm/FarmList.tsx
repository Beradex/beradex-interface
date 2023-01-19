import React, { Fragment } from 'react'

// import { CurrencyAmount, Token } from 'sdk-core/entities'

// import { DoubleCurrencyLogo } from 'components/DoubleLogo/DoubleCurrencyLogo.stories'
// import { Link } from 'react-router-dom'
// import StakingModal from 'components/farm/StakingModal'
// import UnstakingModal from 'components/farm/UnstakingModal'
// import { isTruthy } from 'utils/isTruthy'

import JSBI from 'jsbi'
// import CurrencyLogo from 'components/CurrencyLogo'
import { FarmTable, FarmTableRow } from 'components/farm/FarmTable'

import {
  MinichefRawPoolInfo,
  useCalculateAPR,
  useFarmTVL,
  usePairTokens,
  usePools,
  useRewardInfos,
} from 'state/farm/farm-hooks'

import styled from 'styled-components'
import { Tux } from '../../components/farm/TuxBanner'
import { FarmHeading } from '../../components/farm/FarmHeading'
import { HRDark } from '../../components/HR/HR'
import { CurrencyAmount } from 'sdk-core/entities'
import { useUSDCValue } from 'hooks/useUSDCPrice'
import { NomadWarningBanner } from 'components/WarningBanner/NomadWarningBanner'

const FarmListContainer = styled.div`
  max-width: 1080px;
  width: 100%;
`

export function FarmListPage() {
  const pools = usePools()

  return (
    <FarmListContainer>
      <Tux />
      <NomadWarningBanner />
      <FarmHeading />
      {/* {pools.map((pool) => pool.lpTokenAddress && <Pool key={pool.lpTokenAddress} {...pool} />).filter(isTruthy)} */}
      <FarmTable>
        {pools.map((pool) => (
          <Fragment key={pool.poolId}>
            <HRDark />
            <PoolRow {...pool} />
          </Fragment>
        ))}
      </FarmTable>
    </FarmListContainer>
  )
}

type PoolProps = MinichefRawPoolInfo

function PoolRow({
  lpTokenAddress,
  poolId,
  // pendingAmount,
  rewarderAddress,
  stakedRawAmount,
  poolEmissionAmount,
}: PoolProps) {
  const { totalPoolStaked, pair, lpToken } = usePairTokens(lpTokenAddress)
  const { rewardPerSecondAmount } = useRewardInfos(poolId, rewarderAddress)

  const tvl = useFarmTVL(pair ?? undefined, totalPoolStaked)
  const primaryAPR = useCalculateAPR(poolEmissionAmount, tvl)
  const secondaryAPR = useCalculateAPR(rewardPerSecondAmount, tvl)
  const totalAPR = JSBI.add(primaryAPR || JSBI.BigInt(0), secondaryAPR || JSBI.BigInt(0))

  const stakedAmount = lpToken ? CurrencyAmount.fromRawAmount(lpToken, stakedRawAmount || 0) : undefined

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolStaked &&
    !!stakedAmount &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolStaked.quotient, stakedAmount.quotient)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolStaked, stakedAmount, false),
          pair.getLiquidityValue(pair.token1, totalPoolStaked, stakedAmount, false),
        ]
      : [undefined, undefined]

  const token0Value = useUSDCValue(token0Deposited)
  const token1Value = useUSDCValue(token1Deposited)

  const positionValue = token0Value?.multiply(2) || token1Value?.multiply(2)

  return (
    <>
      <FarmTableRow
        pair={pair ?? undefined}
        poolId={poolId}
        tvl={tvl}
        totalLPStaked={totalPoolStaked}
        primaryEmissionPerSecond={poolEmissionAmount}
        secondaryEmissionPerSecond={rewardPerSecondAmount}
        totalAPR={totalAPR}
        positionValue={positionValue}
      />
    </>
  )
}
