import React from 'react'
import { useSelector } from 'react-redux'
import { Overview } from './components/Overview'
import { DaysChart } from './components/DaysChart'
import { LabelsChart } from './components/LabelsChart'
import { NoData } from './components/NoData'
import { Grid } from '@material-ui/core'
import styled from 'styled-components'

export const Stats = () => {
  const sessions = useSelector((state) => state.sessions)

  return (
    <div>
      {sessions && sessions.length ? (
        <Container>
          <Grid container spacing={5} justify="center">
            <Grid item xs={12}>
              <Overview />
            </Grid>

            <Grid item xs={12} lg={6}>
              <DaysChart />
            </Grid>

            <Grid item xs={12} lg={6}>
              <LabelsChart />
            </Grid>
          </Grid>
        </Container>
      ) : (
        <NoData />
      )}
    </div>
  )
}

const Container = styled.div`
  max-width: 350px;
  margin: auto;
  height: 100%;

  @media (min-width: 768px) {
    max-width: 450px;
  }

  @media (min-width: 960px) {
    max-width: 550px;
  }

  @media (min-width: 1280px) {
    max-width: 950px;
  }
`
