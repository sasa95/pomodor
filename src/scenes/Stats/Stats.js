import React from 'react'
import { useSelector } from 'react-redux'
import { Overview } from './components/Overview'
import { DaysChart } from './components/DaysChart'
import { LabelsChart } from './components/LabelsChart'
import { NoData } from './components/NoData'

export const Stats = () => {
  const sessions = useSelector((state) => state.sessions)

  return (
    <div>
      {sessions && sessions.length ? (
        <>
          <Overview />
          <DaysChart />
          <LabelsChart />
        </>
      ) : (
        <NoData />
      )}
    </div>
  )
}
