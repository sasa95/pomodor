import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { useTheme, useMediaQuery } from '@material-ui/core'
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
import todayIconLight from './assets/icons/today/today-light.svg'
import todayIconDark from './assets/icons/today/today-dark.svg'
import weekIconLight from './assets/icons/week/week-light.svg'
import weekIconDark from './assets/icons/week/week-dark.svg'
import monthIconLight from './assets/icons/month/month-light.svg'
import monthIconDark from './assets/icons/month/month-dark.svg'
import totalIconLight from './assets/icons/total/total-light.svg'
import totalIconDark from './assets/icons/total/total-dark.svg'
import { OverviewSubcard } from './components/OverviewSubcard'

require('dayjs/locale/en-gb')
require('dayjs/locale/en')

dayjs.extend(isToday)
dayjs.extend(weekOfYear)

export const Overview = () => {
  const [dataType, setDataType] = useState('time')
  const [todayStats, setTodayStats] = useState({
    time: null,
    sessions: null,
    timeTrend: null,
    sessionsTrend: null,
  })
  const [weekStats, setWeekStats] = useState({
    time: null,
    sessions: null,
    timeTrend: null,
    sessionsTrend: null,
  })
  const [monthStats, setMonthStats] = useState({
    time: null,
    sessions: null,
    timeTrend: null,
    sessionsTrend: null,
  })

  const [totalStats, setTotalStats] = useState({ time: null, sessions: null })

  const sessions = useSelector((state) => state.sessions)
  const userCreationTime = useSelector((state) => state.auth.creationTime)
  const darkMode = useSelector((state) => +state.settings.darkMode)

  const firstDayOfTheWeek = useSelector(
    (state) => state.settings.firstDayOfTheWeek
  )

  const onChipClicked = (typeSelected) => {
    if (typeSelected === dataType) return

    setDataType(typeSelected)
  }

  const getSeconds = ({ minutes, seconds }) => minutes * 60 + seconds

  const theme = useTheme()

  useEffect(() => {
    if (sessions && sessions.length && firstDayOfTheWeek) {
      if (firstDayOfTheWeek === 'Monday') {
        dayjs.locale('en-gb')
      } else {
        dayjs.locale('en')
      }

      let today = {
        time: 0,
        sessions: 0,
        timeTrend: 0,
        sessionsTrend: 0,
      }
      let week = {
        time: 0,
        sessions: 0,
        timeTrend: 0,
        sessionsTrend: 0,
      }

      let month = {
        time: 0,
        sessions: 0,
        timeTrend: 0,
        sessionsTrend: 0,
      }

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
        timeTrend: calculateTrend(total.time, today.time, daysDiff),
        sessionsTrend: calculateTrend(total.sessions, today.sessions, daysDiff),
      })

      setWeekStats({
        time: calculateTime(week.time),
        sessions: week.sessions,
        timeTrend: calculateTrend(total.time, week.time, daysDiff / 7),
        sessionsTrend: calculateTrend(
          total.sessions,
          week.sessions,
          daysDiff / 7
        ),
      })

      setMonthStats({
        time: calculateTime(month.time),
        sessions: month.sessions,
        timeTrend: calculateTrend(total.time, month.time, daysDiff / 30),
        sessionsTrend: calculateTrend(
          total.sessions,
          month.sessions,
          daysDiff / 30
        ),
      })

      setTotalStats({
        time: calculateTime(total.time),
        sessions: total.sessions,
      })
    }
  }, [firstDayOfTheWeek, sessions, userCreationTime])

  const calculateTime = (time) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)

    if (!hours && !minutes) return '-'

    return `${hours}h ${minutes}m`
  }

  const calculateTrend = (total, period, divider) => {
    if (total === period) return

    const d = divider || 1
    const avgSeconds = total / d

    const percent = (period * 100) / avgSeconds

    if (percent === 0) return

    return Math.round((percent - 100 + Number.EPSILON) * 10) / 10
  }

  const updateStats = (period, time) => {
    return {
      time: period.time + time,
      sessions: period.sessions + 1,
    }
  }

  const isMediumScreen = +useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Card theme={theme} dark={darkMode}>
      <CardHeader title="Overview"></CardHeader>
      <CardContent theme={theme}>
        <Grid
          container
          direction={isMediumScreen ? 'row' : 'column'}
          spacing={0}
          justify="space-between"
        >
          <SubcardContainer item xs={12} md={5} lg={3} ismd={isMediumScreen}>
            <OverviewSubcard
              icon={darkMode ? todayIconDark : todayIconLight}
              label="Today"
              sum={
                dataType === 'time'
                  ? todayStats.time || '-'
                  : todayStats.sessions || '-'
              }
              trend={
                dataType === 'time'
                  ? todayStats.timeTrend
                  : todayStats.sessionsTrend
              }
            />

            {!isMediumScreen && <Divider />}
          </SubcardContainer>

          <SubcardContainer item xs={12} md={5} lg={3} ismd={isMediumScreen}>
            <OverviewSubcard
              icon={darkMode ? weekIconDark : weekIconLight}
              label="Week"
              sum={
                dataType === 'time'
                  ? weekStats.time || '-'
                  : weekStats.sessions || '-'
              }
              trend={
                dataType === 'time'
                  ? weekStats.timeTrend
                  : weekStats.sessionsTrend
              }
            />
            {!isMediumScreen && <Divider />}
          </SubcardContainer>

          <SubcardContainer item xs={12} md={5} lg={3} ismd={isMediumScreen}>
            <OverviewSubcard
              icon={darkMode ? monthIconDark : monthIconLight}
              label="Month"
              sum={
                dataType === 'time'
                  ? monthStats.time || '-'
                  : monthStats.sessions || '-'
              }
              trend={
                dataType === 'time'
                  ? monthStats.timeTrend
                  : monthStats.sessionsTrend
              }
            />
            {!isMediumScreen && <Divider />}
          </SubcardContainer>

          <SubcardContainer item xs={12} md={5} lg={3} ismd={isMediumScreen}>
            <OverviewSubcard
              icon={darkMode ? totalIconDark : totalIconLight}
              label="Total"
              sum={
                dataType === 'time'
                  ? totalStats.time || '-'
                  : totalStats.sessions || '-'
              }
            />
            {!isMediumScreen && <Divider />}
          </SubcardContainer>
        </Grid>
      </CardContent>

      <CardActions md={isMediumScreen}>
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

const Card = styled(MatCard)`
  background: ${({ dark }) => (dark ? '#252525' : '#fff')};
`

const CardContent = styled(MatCardContent)`
  padding: 0;

  .MuiGrid-spacing-xs-3 > .MuiGrid-item {
    padding-bottom: 0;
  }

  ${({ theme }) => theme.breakpoints.up('md')} {
    padding: 16px;

    .MuiGrid-justify-xs-space-between {
      justify-content: space-around;
    }

    .MuiGrid-spacing-xs-3 > .MuiGrid-item {
      display: flex;
      justify-content: center;
    }
  }
`

const SubcardContainer = styled(Grid)`
  ${({ ismd }) =>
    ismd &&
    css`
      display: flex;
      justify-content: center;
    `}
`
