import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
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
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
require('dayjs/locale/en-gb')
require('dayjs/locale/en')

dayjs.extend(isToday)
dayjs.extend(weekOfYear)

export const Overview = () => {
  const [dataType, setDataType] = useState('time')
  const [todayStats, setTodayStats] = useState({
    time: null,
    sessions: null,
    avgTime: null,
    avgSessions: null,
  })
  const [weekStats, setWeekStats] = useState({
    time: null,
    sessions: null,
    avgTime: null,
    avgSessions: null,
  })
  const [monthStats, setMonthStats] = useState({
    time: null,
    sessions: null,
    avgTime: null,
    avgSessions: null,
  })

  const [totalStats, setTotalStats] = useState({ time: null, sessions: null })

  const sessions = useSelector((state) => state.sessions)
  const userCreationTime = useSelector((state) => state.auth.creationTime)
  const firstDayOfTheWeek = useSelector(
    (state) => state.settings.firstDayOfTheWeek
  )

  const onChipClicked = (typeSelected) => {
    if (typeSelected === dataType) return

    setDataType(typeSelected)
  }

  const getSeconds = ({ minutes, seconds }) => minutes * 60 + seconds

  const theme = useTheme()

  const calculateAvgTime = useCallback((total, divider) => {
    const d = divider || 1
    const seconds = Math.round((total / d + Number.EPSILON) * 10) / 10
    return calculateTime(seconds)
  }, [])

  useEffect(() => {
    if (sessions && sessions.length && firstDayOfTheWeek) {
      if (firstDayOfTheWeek === 'Monday') {
        dayjs.locale('en-gb')
      } else {
        dayjs.locale('en')
      }

      let today = { time: 0, sessions: 0, avgTime: 0, avgSessions: 0 }
      let week = { time: 0, sessions: 0, avgTime: 0, avgSessions: 0 }
      let month = { time: 0, sessions: 0, avgTime: 0, avgSessions: 0 }
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

      const now = dayjs()
      const creationTime = dayjs(userCreationTime)
      const daysDiff = now.diff(creationTime, 'd')

      setTodayStats({
        time: calculateTime(today.time),
        sessions: today.sessions,
        avgSessions: calculateAvgSessions(total.sessions, daysDiff),
        avgTime: calculateAvgTime(total.time, daysDiff),
      })

      setWeekStats({
        time: calculateTime(week.time),
        sessions: week.sessions,
        avgSessions: calculateAvgSessions(total.sessions, daysDiff / 7),
        avgTime: calculateAvgTime(total.time, daysDiff / 7),
      })

      setMonthStats({
        time: calculateTime(month.time),
        sessions: month.sessions,
        avgSessions: calculateAvgSessions(total.sessions, daysDiff / 30),
        avgTime: calculateAvgTime(total.time, daysDiff / 30),
      })

      setTotalStats({
        time: calculateTime(total.time),
        sessions: total.sessions,
      })
    }
  }, [calculateAvgTime, firstDayOfTheWeek, sessions, userCreationTime])

  const calculateTime = (time) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)

    if (!hours && !minutes) return '-'

    return `${hours}h ${minutes}m`
  }

  const calculateAvgSessions = (total, divider) => {
    if (divider === 0) return total
    return Math.round((total / divider + Number.EPSILON) * 10) / 10
  }

  const updateStats = (period, time) => {
    return {
      time: period.time + time,
      sessions: period.sessions + 1,
    }
  }

  return (
    <Card theme={theme}>
      <CardHeader title="Overview"></CardHeader>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Box display="flex" flexDirection="column">
              <Sum color={theme.palette.secondary.main}>
                {dataType === 'time'
                  ? todayStats.time || '-'
                  : todayStats.sessions || '-'}
              </Sum>

              <Label>Today</Label>

              <Avg color={theme.palette.text.secondary}>
                {dataType === 'time'
                  ? todayStats.avgTime || '-'
                  : todayStats.avgSessions || '-'}{' '}
                avg
              </Avg>
            </Box>
          </Grid>

          <Grid item xs={3}>
            <Box display="flex" flexDirection="column">
              <Sum color={theme.palette.secondary.main}>
                {dataType === 'time'
                  ? weekStats.time || '-'
                  : weekStats.sessions || '-'}
              </Sum>

              <Label>Week {dayjs().week()}</Label>

              <Avg color={theme.palette.text.secondary}>
                {dataType === 'time'
                  ? weekStats.avgTime || '-'
                  : weekStats.avgSessions || '-'}{' '}
                avg
              </Avg>
            </Box>
          </Grid>

          <Grid item xs={3}>
            <Box display="flex" flexDirection="column">
              <Sum color={theme.palette.secondary.main}>
                {dataType === 'time'
                  ? monthStats.time || '-'
                  : monthStats.sessions || '-'}
              </Sum>

              <Label>{dayjs().format('MMMM')}</Label>

              <Avg color={theme.palette.text.secondary}>
                {dataType === 'time'
                  ? monthStats.avgTime || '-'
                  : monthStats.avgSessions || '-'}{' '}
                avg
              </Avg>
            </Box>
          </Grid>

          <Grid item xs={3}>
            <Box display="flex" flexDirection="column">
              <Sum color={theme.palette.secondary.main}>
                {dataType === 'time'
                  ? totalStats.time || '-'
                  : totalStats.sessions || '-'}
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
              color={dataType === 'time' ? 'secondary' : 'default'}
              clickable
            />
          </Box>

          <Chip
            onClick={() => onChipClicked('sessions')}
            label="Sessions"
            color={dataType === 'sessions' ? 'secondary' : 'default'}
            clickable
          />
        </div>
      </CardActions>
    </Card>
  )
}

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

export { Sum, Avg }
