import React from 'react'
import { Overview } from './components/Overview'
import { DaysChart } from './components/DaysChart'
import { LabelsChart } from './components/LabelsChart'

export const Stats = () => {
  return (
    <div>
      <Overview />
      <DaysChart />
      <LabelsChart />
    </div>
  )
}
