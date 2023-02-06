import { AutoColumn } from 'components/Column'
import { CurrencyLogoFromList } from 'components/CurrencyLogo/CurrencyLogoFromList'
import { HRDark } from 'components/HR/HR'
import QuestionHelper from 'components/QuestionHelper'
import { AutoRow } from 'components/Row'
import { useEarnedBrdx } from 'components/stake/stake-hooks'
import { TokenAndUSDCBalance, TokenLogo } from 'components/stake/StakingBalance'
import { BRDX, XBRDX } from 'constants/tokens'
import usePrevious from 'hooks/usePrevious'
import { useUSDCValue } from 'hooks/useUSDCPrice'
import { useActiveWeb3React } from 'hooks/web3'
import React from 'react'
import { useTokenBalance } from 'state/wallet/hooks'
import { TYPE } from 'theme'
import { CountUp } from 'use-count-up'
import { AssetRow, AssetsContainer, AssetsTableHeaderContainer, AssetsTableHeaderText } from '../AssetsTable'

export const StakedAssetRow = ({
  asset,
  assetName,
  assetHelper,
  amount,
  positionValue,
}: {
  asset: React.ReactNode | any | undefined
  assetName: string
  amount: any
  positionValue: any
  assetHelper?: string
}) => (
  <AssetRow to="/stake">
    <AutoRow gap="0%" justify={'space-between'}>
      <AutoColumn justify="start" style={{ width: '33%' }}>
        <TokenLogo>
          <CurrencyLogoFromList currency={asset ?? undefined} size={'24px'} />
          <TYPE.body fontSize={20} fontWeight={500} margin={'10px'}>
            {assetName}
          </TYPE.body>
          {!!assetHelper && <QuestionHelper text={assetHelper} />}
        </TokenLogo>
      </AutoColumn>
      <AutoColumn justify="center" style={{ width: '33%' }}>
        <TokenAndUSDCBalance>{amount}</TokenAndUSDCBalance>
      </AutoColumn>
      <AutoColumn justify="end" style={{ width: '33%' }}>
        <TokenAndUSDCBalance>{positionValue}</TokenAndUSDCBalance>
      </AutoColumn>
    </AutoRow>
    <HRDark />
  </AssetRow>
)

const StakedAssetsTable = () => {
  const { account, chainId } = useActiveWeb3React()
  const token = chainId ? BRDX[chainId] : undefined
  const xToken = chainId ? XBRDX[chainId] : undefined
  const xbrdxBalance = useTokenBalance(account ?? undefined, xToken)
  const earnedBrdx = useEarnedBrdx(xbrdxBalance)
  const earnedBrdxUSDCValue = useUSDCValue(earnedBrdx)

  const countUpXBrdxBalance = xbrdxBalance?.toSignificant() ?? '0'
  const countUpXBrdxBalancePrevious = usePrevious(countUpXBrdxBalance) ?? '0'
  const countUpEarnedBrdxBalanceUSDC = earnedBrdxUSDCValue?.toSignificant() ?? '0'
  const countUpEarnedBrdxBalanceUSDCPrevious = usePrevious(countUpEarnedBrdxBalanceUSDC) ?? '0'

  const countUpEarnedBrdxBalance = earnedBrdx?.toSignificant() ?? '0'
  const countUpEarnedBrdxBalancePrevious = usePrevious(countUpEarnedBrdxBalance) ?? '0'

  return (
    <AssetsContainer>
      <AssetsTableHeaderContainer justify={'space-between'}>
        <AssetsTableHeaderText>Staked Asset</AssetsTableHeaderText>
        <AssetsTableHeaderText>Equivalent Amount</AssetsTableHeaderText>
        <AssetsTableHeaderText>Position Value</AssetsTableHeaderText>
      </AssetsTableHeaderContainer>
      <AssetRow to="/stake" style={{ cursor: 'pointer' }}>
        <AutoRow gap="0%" justify={'space-between'}>
          <AutoColumn justify="start" style={{ width: '33%', display: 'flex' }}>
            <TokenLogo>
              <CurrencyLogoFromList currency={xToken ?? undefined} size={'24px'} />
              <TYPE.body fontSize={20} fontWeight={500} margin={'10px'}>
                xBRDX
              </TYPE.body>
              {/* {!!assetHelper && <QuestionHelper text={assetHelper} />} */}
            </TokenLogo>
            <TokenAndUSDCBalance>
              <CountUp
                key={xbrdxBalance?.toFixed(0)}
                isCounting
                decimalPlaces={2}
                start={parseFloat(countUpXBrdxBalancePrevious)}
                end={parseFloat(countUpXBrdxBalance)}
                thousandsSeparator={','}
                duration={1}
              />
            </TokenAndUSDCBalance>
          </AutoColumn>
          <AutoColumn justify="center" style={{ width: '33%', display: 'flex' }}>
            <TokenLogo>
              <CurrencyLogoFromList currency={token ?? undefined} size={'24px'} />
              <TYPE.body fontSize={20} fontWeight={500} margin={'10px'}>
                Staked BRDX
              </TYPE.body>
              <QuestionHelper
                text={`${earnedBrdx?.toFixed(
                  2
                )} BRDX is available upon unstaking ${xbrdxBalance?.toSignificant()} xBRDX.`}
              />
            </TokenLogo>
            <TokenAndUSDCBalance style={{ marginLeft: 12 }}>
              {earnedBrdx ? (
                <CountUp
                  key={earnedBrdx?.toFixed(0)}
                  isCounting
                  decimalPlaces={2}
                  start={parseFloat(countUpEarnedBrdxBalancePrevious)}
                  end={parseFloat(countUpEarnedBrdxBalance)}
                  thousandsSeparator={','}
                  duration={1}
                />
              ) : (
                `     `
              )}
            </TokenAndUSDCBalance>
          </AutoColumn>
          <AutoColumn justify="end" style={{ width: '33%' }}>
            <TokenAndUSDCBalance>
              {' '}
              <span style={{ color: '#ffe500', fontSize: '14px', paddingLeft: '5px' }}>
                <span>$</span>
                {earnedBrdxUSDCValue ? (
                  <CountUp
                    key={earnedBrdxUSDCValue?.toFixed(0)}
                    isCounting
                    decimalPlaces={2}
                    start={parseFloat(countUpEarnedBrdxBalanceUSDCPrevious)}
                    end={parseFloat(countUpEarnedBrdxBalanceUSDC)}
                    thousandsSeparator={','}
                    duration={1}
                  />
                ) : (
                  `     `
                )}
              </span>
            </TokenAndUSDCBalance>
          </AutoColumn>
        </AutoRow>
        <HRDark />
      </AssetRow>
    </AssetsContainer>
  )
}

export default StakedAssetsTable
