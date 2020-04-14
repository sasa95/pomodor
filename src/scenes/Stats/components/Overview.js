import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTheme } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import MatCard from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import MatCardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import CardActions from '@material-ui/core/CardActions'
import Chip from '@material-ui/core/Chip'
import { useSelector } from 'react-redux'
import * as dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
require('dayjs/locale/uk')

dayjs.locale('uk')
dayjs.extend(isToday)
dayjs.extend(weekOfYear)

const Card = styled(MatCard)`
  margin: 10px auto auto;
  max-width: 350px;

  @media (min-width: 768px) {
    max-width: 450px;
  }

  ${({ theme }) => theme.breakpoints.up('md')} {
    max-width: 550px;
  }
`

const CardContent = styled(MatCardContent)`
  padding-top: 0;
`

const Sum = styled.span`
  display: inline-block;
  text-align: center;
  color: ${({ color }) => color};
  font-weight: bold;
`

const Label = styled.span`
  display: inline-block;
  text-align: center;
  margin: 2px 0;
`

const Avg = styled.span`
  display: inline-block;
  text-align: center;
  font-size: 0.7rem;
  color: ${({ color }) => color};
`

export const Overview = () => {
  const [dataType, setDataType] = useState('time')
  const [todayStats, setTodayStats] = useState()
  const [weekStats, setWeekStats] = useState()
  const [monthStats, setMonthStats] = useState()
  const [totalStats, setTotalStats] = useState()

  const sessions = useSelector((state) => state.sessions)

  const getSeconds = ({ minutes, seconds }) => minutes * 60 + seconds

  const formatStats = ({ time, sessions }) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)

    return {
      time: `${hours}h ${minutes}m`,
      sessions,
    }
  }

  const updateStats = (period, time) => {
    return {
      time: period.time + time,
      sessions: period.sessions + 1,
    }
  }

  const onChipClicked = (typeSelected) => {
    if (typeSelected === dataType) return

    setDataType(typeSelected)
  }

  const theme = useTheme()

  useEffect(() => {
    if (sessions && sessions.length) {
      let today = { time: 0, sessions: 0 }
      let week = { time: 0, sessions: 0 }
      let month = { time: 0, sessions: 0 }
      let total = { time: 0, sessions: 0 }

      sessions.forEach(({ duration, createdAt }) => {
        const secondsCalculated = getSeconds(duration)

        total = updateStats(total, secondsCalculated)

        if (dayjs(createdAt).month() === dayjs().month()) {
          month = updateStats(month, secondsCalculated)

          if (dayjs(createdAt).week() === dayjs().week()) {
            week = updateStats(week, secondsCalculated)

            if (dayjs(createdAt).isToday()) {
              today = updateStats(today, secondsCalculated)
            }
          }
        }
      })

      setTodayStats(formatStats(today))
      setWeekStats(formatStats(week))
      setMonthStats(formatStats(month))
      setTotalStats(formatStats(total))
    }
  }, [sessions])

  return (
    <Card theme={theme}>
      <CardHeader title="Overview"></CardHeader>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Box display="flex" flexDirection="column">
              <Sum color={theme.palette.primary.main}>
                {todayStats && todayStats.time ? todayStats.time : '-'}
              </Sum>
              <Label>Today</Label>
              <Avg color={theme.palette.text.secondary}>1h 51m avg</Avg>
            </Box>
          </Grid>

          <Grid item xs={3}>
            <Box display="flex" flexDirection="column">
              <Sum color={theme.palette.primary.main}>
                {weekStats && weekStats.time ? weekStats.time : '-'}
              </Sum>
              <Label>Week</Label>
              <Avg color={theme.palette.text.secondary}>11h 12m avg</Avg>
            </Box>
          </Grid>

          <Grid item xs={3}>
            <Box display="flex" flexDirection="column">
              <Sum color={theme.palette.primary.main}>
                {monthStats && monthStats.time ? monthStats.time : '-'}
              </Sum>
              <Label>Month</Label>
              <Avg color={theme.palette.text.secondary}>22h 3m avg</Avg>
            </Box>
          </Grid>

          <Grid item xs={3}>
            <Box display="flex" flexDirection="column">
              <Sum color={theme.palette.primary.main}>
                {totalStats && totalStats.time ? totalStats.time : '-'}
              </Sum>
              <Label>Total</Label>
            </Box>
          </Grid>
        </Grid>
      </CardContent>

      <Divider variant="middle" />

      <CardActions>
        <div>
          <Box mr={1} display="inline-block">
            <Chip
              onClick={() => onChipClicked('time')}
              label="Time"
              color={dataType === 'time' ? 'primary' : 'default'}
              clickable
            />
          </Box>

          <Chip
            onClick={() => onChipClicked('sessions')}
            label="Sessions"
            color={dataType === 'sessions' ? 'primary' : 'default'}
            clickable
          />
        </div>
      </CardActions>
    </Card>
  )
}
