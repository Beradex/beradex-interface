import { AutoColumn } from 'components/Column'
import { InfoCard } from 'components/InfoCard'

import styled from 'styled-components'

import React from 'react'

import { BeraIcon } from '../../components/Potions/Potions'
import { TYPE } from '../../theme'

import TuxImg from '../../assets/images/tux2.png'

import { StakingBalance } from 'components/stake/StakingBalance'

const Tux = styled.img`
  position: absolute;
  height: 250px;
  margin-top: 45%;
  margin-left: 50%;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none
  `};
  z-index: -1;
`

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
  margin-top: -5%;
`

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  margin-bottom: 2%;
`

/* const APYRow = styled(RowBetween)`
  background: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.darkTransparent} 0%, ${theme.secondary1_30} 50%, ${theme.darkTransparent} 100%);`};
  border: 1px solid rgba(163, 163, 163, 0.3);
  box-shadow: 0 0 5px rgba(201, 114, 0, 0), 0 0 7px rrgba(205, 113, 0, 0.3);
  border-radius: 10px;
  padding: 2% 5%;
  width: 50%;
  font-size: 22px;
` */

export function StakingPage() {
  return (
    <>
      <PageWrapper>
        <Tux src={TuxImg} />
        <Heading>
          <BeraIcon width={60} height={60} />
          <TYPE.largeHeader style={{ margin: 0 }}>Boost your yield by staking BRDX for xBRDX</TYPE.largeHeader>
        </Heading>
        <AutoColumn gap="lg" justify="center">
          <InfoCard
            title="Staking rewards"
            description={`For every swap on the exchange, half of 0.05% of the 0.30% swap fees are distributed as BRDX proportional to your share of the staking pool.  Additionally, daily beraDEX holder rewards from inflation are deposited into this pool. When your BRDX is staked you receive xBRDX.

          ${`\n`} Your xBRDX is continuously compounding, when you unstake you will receive all the originally deposited BRDX and any additional from fees and daily beraDEX holders rewards`}
          />
          <StakingBalance />
        </AutoColumn>
      </PageWrapper>
    </>
  )
}
