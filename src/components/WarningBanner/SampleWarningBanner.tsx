import React from 'react'
import { InfoCard } from 'components/InfoCard'

export function SampleWarningBanner({ style }: { style?: any }) {
  return (
    <InfoCard
      style={style}
      title="Sample Title"
      description={
        <ol>
          <li>Sample description</li>
          <li>Sample Description</li>
        </ol>
      }
    />
  )
}
