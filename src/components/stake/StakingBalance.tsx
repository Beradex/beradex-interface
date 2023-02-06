import { ButtonPrimary } from 'components/Button'
import { AutoColumn } from 'components/Column'

import StakingModal from './StakingModal'
import UnstakingModal from './UnstakingModal'
import styled from 'styled-components'
import { BRDX, XBRDX } from 'constants/tokens'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useState } from 'react'
import { useTokenBalance } from 'state/wallet/hooks'
import { TYPE } from '../../theme'
import { AutoRow, RowBetween } from '../../components/Row'
import { CurrencyLogoFromList } from '../../components/CurrencyLogo/CurrencyLogoFromList'
import { HRDark } from '../../components/HR/HR'

import { useEarnedBrdx, useStakingAPY } from 'components/stake/stake-hooks'
import DoubleCurrencyLogo from 'components/DoubleLogo'
import { CurrencyAmount } from 'sdk-core/entities'
import { useUSDCValue } from '../../hooks/useUSDCPrice'
import { FarmYield } from '../farm/FarmYield'
import JSBI from 'jsbi'
import { CountUp } from 'use-count-up'
import QuestionHelper from '../QuestionHelper'
import { Glow } from '../../pages/AppBody'
import usePrevious from '../../hooks/usePrevious'

export const TokenAndUSDCBalance = styled.div`
  display: flex;
  align-items: center;
`

export function StakingBalance() {
  const { account, chainId } = useActiveWeb3React()
  const token = chainId ? BRDX[chainId] : undefined
  const xToken = chainId ? XBRDX[chainId] : undefined
  const brdxBalance = useTokenBalance(account ?? undefined, token)
  const brdxUSDCValue = useUSDCValue(brdxBalance)
  const xbrdxBalance = useTokenBalance(account ?? undefined, xToken)
  const earnedBrdx = useEarnedBrdx(xbrdxBalance)
  const earnedBrdxUSDCValue = useUSDCValue(earnedBrdx)
  const xBrdxContractBalance = useTokenBalance(chainId ? XBRDX[chainId].address : undefined, token)
  const xBrdxContractUSDCBalance = useUSDCValue(xBrdxContractBalance)
  const emission = token ? CurrencyAmount.fromRawAmount(token, 0e18) : undefined // BERADEX: CHANGE EMISSIONS/APR

  const emissionPerSecond = token ? CurrencyAmount.fromRawAmount(token, 0e18) : undefined // BERADEX: CHANGE EMISSIONS/APR

  const apr =
    emission && xBrdxContractBalance
      ? emission
          ?.divide(xBrdxContractBalance ? xBrdxContractBalance : JSBI.BigInt(1))
          .multiply(100)
          .multiply(365).quotient
      : JSBI.BigInt(0)

  const ratio = useEarnedBrdx(xToken ? CurrencyAmount.fromRawAmount(xToken, 10 ** xToken.decimals) : undefined)
  const ratioPrevious = usePrevious(parseFloat(ratio ? ratio?.toSignificant() : '0'))
  const apy = useStakingAPY()

  const countUpBrdxBalance = brdxBalance?.toSignificant() ?? '0'
  const countUpBrdxBalancePrevious = usePrevious(countUpBrdxBalance) ?? '0'

  const countUpBrdxBalanceUSDC = brdxUSDCValue?.toSignificant() ?? '0'
  const countUpBrdxBalanceUSDCPrevious = usePrevious(countUpBrdxBalanceUSDC) ?? '0'

  const countUpXBrdxBalance = xbrdxBalance?.toSignificant() ?? '0'
  const countUpXBrdxBalancePrevious = usePrevious(countUpXBrdxBalance) ?? '0'

  const countUpEarnedBrdxBalanceUSDC = earnedBrdxUSDCValue?.toSignificant() ?? '0'
  const countUpEarnedBrdxBalanceUSDCPrevious = usePrevious(countUpEarnedBrdxBalanceUSDC) ?? '0'

  const countUpEarnedBrdxBalance = earnedBrdx?.toSignificant() ?? '0'
  const countUpEarnedBrdxBalancePrevious = usePrevious(countUpEarnedBrdxBalance) ?? '0'

  const [stakingModalOpen, setStakingModalOpen] = useState(false)
  const [unstakeModalOpen, setUnstakeModalOpen] = useState(false)
  console.log(apy)
  return (
    <>
      <FarmYield
        apr={apr}
        totalDeposits={xBrdxContractBalance}
        totalDepositsInUSD={xBrdxContractUSDCBalance}
        yourDeposits={earnedBrdx}
        yourDepositsInUSD={earnedBrdxUSDCValue}
        primaryEmissionPerSecond={emissionPerSecond}
        emissionTimeframe={'daily'}
      />

      <BalanceRow>
        <BalanceColumn justify={`stretch`}>
          <RowBetween>
            <AutoColumn justify={'start'}>
              <TYPE.largeHeader color={'primary1'} marginBottom={`15px`}>
                Your Balances
              </TYPE.largeHeader>
            </AutoColumn>
            <AutoColumn justify={'end'}>
              <TYPE.largeHeader color={'primary1'} marginBottom={`10px`}>
                <TokenLogo>
                  <DoubleCurrencyLogo currency0={xToken} currency1={token} size={16} />
                  <TYPE.body fontSize={16} fontWeight={500} margin={'10px'}>
                    BRDX / xBRDX Ratio:{' '}
                    <span style={{ color: '#ffe500', fontSize: '14px', paddingLeft: '7px' }}>
                      {ratio ? (
                        <CountUp
                          key={ratio?.toSignificant()}
                          isCounting
                          decimalPlaces={4}
                          start={ratioPrevious}
                          end={parseFloat(ratio?.toSignificant())}
                          thousandsSeparator={','}
                          duration={1}
                        />
                      ) : (
                        `     `
                      )}
                    </span>
                  </TYPE.body>
                  <QuestionHelper text={`Unstaking 1 xBRDX will earn ${ratio?.toSignificant()} BRDX`} />
                </TokenLogo>
              </TYPE.largeHeader>
            </AutoColumn>
          </RowBetween>
          <HRDark />
          <RowBetween>
            <AutoColumn justify={'start'}>
              <TokenLogo>
                <CurrencyLogoFromList currency={token ?? undefined} size={'24px'} />
                <TYPE.body fontSize={20} fontWeight={500} margin={'10px'}>
                  BRDX
                </TYPE.body>
              </TokenLogo>
            </AutoColumn>
            <AutoColumn justify={'end'}>
              <TokenAndUSDCBalance>
                {brdxBalance?.toSignificant() ? (
                  <CountUp
                    key={brdxBalance?.toSignificant()}
                    isCounting
                    decimalPlaces={4}
                    start={parseFloat(countUpBrdxBalancePrevious)}
                    end={parseFloat(countUpBrdxBalance)}
                    thousandsSeparator={','}
                    duration={1}
                  />
                ) : (
                  <></>
                )}
                <span style={{ color: '#ffe500', fontSize: '14px', paddingLeft: '5px' }}>
                  <span>$</span>
                  {brdxUSDCValue ? (
                    <CountUp
                      key={brdxUSDCValue?.toFixed(0)}
                      isCounting
                      decimalPlaces={2}
                      start={parseFloat(countUpBrdxBalanceUSDCPrevious)}
                      end={parseFloat(countUpBrdxBalanceUSDC)}
                      thousandsSeparator={','}
                      duration={1}
                    />
                  ) : (
                    `     `
                  )}
                </span>
              </TokenAndUSDCBalance>
            </AutoColumn>
          </RowBetween>
          <HRDark />
          <RowBetween>
            <AutoColumn justify={'start'}>
              <TokenLogo>
                <CurrencyLogoFromList currency={xToken ?? undefined} size={'24px'} />
                <TYPE.body fontSize={20} fontWeight={500} margin={'10px'}>
                  xBRDX
                </TYPE.body>
              </TokenLogo>
            </AutoColumn>

            <AutoColumn justify={'end'}>
              <TokenAndUSDCBalance>
                {xbrdxBalance ? (
                  <CountUp
                    key={xbrdxBalance?.toFixed(0)}
                    isCounting
                    decimalPlaces={4}
                    start={parseFloat(countUpXBrdxBalancePrevious)}
                    end={parseFloat(countUpXBrdxBalance)}
                    thousandsSeparator={','}
                    duration={1}
                  />
                ) : (
                  `     `
                )}
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
          </RowBetween>
          <HRDark />
          <RowBetween>
            <AutoColumn justify={'start'}>
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
            </AutoColumn>

            <AutoColumn justify={'end'}>
              <TokenAndUSDCBalance>
                {earnedBrdx ? (
                  <CountUp
                    key={earnedBrdx?.toFixed(0)}
                    isCounting
                    decimalPlaces={4}
                    start={parseFloat(countUpEarnedBrdxBalancePrevious)}
                    end={parseFloat(countUpEarnedBrdxBalance)}
                    thousandsSeparator={','}
                    duration={1}
                  />
                ) : (
                  `     `
                )}
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
          </RowBetween>
        </BalanceColumn>
      </BalanceRow>

      <ButtonRow justify={'space-between'}>
        <AutoColumn justify={'stretch'}>
          <ButtonPrimary
            padding="8px"
            borderRadius="8px"
            width="140px"
            disabled={!brdxBalance?.greaterThan('0')}
            onClick={() => setStakingModalOpen(true)}
          >
            Stake
          </ButtonPrimary>
        </AutoColumn>
        <AutoColumn justify={'stretch'}>
          <ButtonPrimary
            padding="8px"
            borderRadius="8px"
            width="140px"
            disabled={!xbrdxBalance?.greaterThan('0')}
            onClick={() => setUnstakeModalOpen(true)}
          >
            Unstake
          </ButtonPrimary>
        </AutoColumn>
      </ButtonRow>

      <StakingModal
        isOpen={stakingModalOpen}
        onDismiss={() => setStakingModalOpen(false)}
        availableAmount={brdxBalance}
        currencyToAdd={xToken}
      />
      <UnstakingModal
        isOpen={unstakeModalOpen}
        onDismiss={() => setUnstakeModalOpen(false)}
        availableAmount={xbrdxBalance}
      />
    </>
  )
}

const BalanceRow = styled(RowBetween)`
  background: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.darkTransparent} 0%, ${theme.secondary1_30} 50%, ${theme.darkTransparent} 100%);`};
  border: 1px solid rgba(188, 110, 0, 0.7);
  box-shadow: 0 0 5px rgba(47, 27, 0, 0.1), 0 0 7px rgba(98, 56, 0, 0.3);
  border-radius: 10px;
  padding: 2% 5%;
  font-size: 22px;
  backdrop-filter: blur(4px) saturate(150%);
  ${Glow}
`

const BalanceColumn = styled(AutoColumn)`
  width: 100%;
`

export const TokenLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const ButtonRow = styled(AutoRow)`
  width: 50%;
`
