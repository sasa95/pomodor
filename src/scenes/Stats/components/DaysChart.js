import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { useTheme } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import MatCard from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import MatCardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import CardActions from '@material-ui/core/CardActions'
import Chip from '@material-ui/core/Chip'
import { Doughnut } from 'react-chartjs-2'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { daysOfWeek, colors } from '../data/constants'
import {
  generateChartTitle,
  generateChartTimeLabel,
  generateChartSessionsLabel,
} from '../data/chartFunctions'
import { filters, getFilterFn } from '../data/filters'

dayjs.extend(isSameOrAfter)
require('dayjs/locale/en-gb')
require('dayjs/locale/en')

export const DaysChart = () => {
  const sessions = useSelector((state) => state.sessions)

  const firstDayOfTheWeek = useSelector(
    (state) => state.settings.firstDayOfTheWeek
  )

  const [chartData, setChartData] = useState({
    labels: daysOfWeek,
    datasets: [{ data: Array(7).fill(1), backgroundColor: colors }],
  })

  const theme = useTheme()

  const [chartOptions, setChartOptions] = useState({
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontColor: theme.palette.text.secondary,
      },
    },
    tooltips: {
      callbacks: {
        title: generateChartTitle,
        label: generateChartTimeLabel,
      },
    },
  })

  const [calculatedData, setCalculatedData] = useState()
  const [dataType, setDataType] = useState('time')
  const [anchorEl, setAnchorEl] = useState(null)
  const [filter, setFilter] = useState(filters.find((f) => f.default))

  useEffect(() => {
    if (sessions && sessions.length && firstDayOfTheWeek) {
      let week = [...daysOfWeek]

      if (firstDayOfTheWeek === 'Monday') {
        dayjs.locale('en-gb')
      } else {
        week = daysOfWeek.slice(1, daysOfWeek.length - 1)

        week.unshift('Sunday')
        week.push('Monday')
        dayjs.locale('en')
      }

      const filterFn = getFilterFn(filter)

      const data = Array(7)
        .fill()
        .map(() => ({ sessions: 0, time: 0 }))

      sessions.forEach(({ createdAt, duration }) => {
        if (filterFn(createdAt, dayjs)) {
          const dayIndex = dayjs(createdAt).day()

          data[dayIndex] = {
            sessions: data[dayIndex].sessions + 1,
            time: data[dayIndex].time + getSeconds(duration),
          }
        }
      })

      setCalculatedData(data)

      setChartData((prev) => {
        const newData = { ...prev }
        newData.datasets[0].data = data.map((d) => d[dataType])
        return newData
      })
    }
  }, [sessions, firstDayOfTheWeek, filter, dataType])

  const onChipClicked = (typeSelected) => {
    if (typeSelected === dataType) return

    setDataType(typeSelected)

    setChartData((prev) => {
      const newData = { ...prev }
      newData.datasets[0].data = calculatedData.map(
        (data) => data[typeSelected]
      )
      return newData
    })

    setChartOptions((prev) => {
      const newOptions = { ...prev }

      newOptions.tooltips.callbacks.label =
        typeSelected === 'time'
          ? generateChartTimeLabel
          : generateChartSessionsLabel

      return newOptions
    })
  }

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const closeMenu = () => {
    setAnchorEl(null)
  }

  const handleSelect = (filter) => {
    setFilter(filter)
    closeMenu()
  }

  const getSeconds = ({ minutes, seconds }) => minutes * 60 + seconds

  return (
    <Card theme={theme}>
      <CardHeader
        title="Days of week"
        action={
          <IconButton aria-label="filtering options" onClick={openMenu}>
            <MoreVertIcon />
          </IconButton>
        }
      ></CardHeader>

      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={closeMenu}
        margin="dense"
      >
        {filters.map((f, i) => (
          <MenuItem
            selected={filter.value === f.value}
            key={i}
            onClick={() => handleSelect(f)}
          >
            {f.name}
          </MenuItem>
        ))}
      </Menu>

      <CardContent>
        <Typography variant="caption" color="textSecondary">
          {(filter.displayName || filter.name || '').toUpperCase()}
        </Typography>

        <ChartContainer>
          <Doughnut data={chartData} options={chartOptions} />
        </ChartContainer>
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

const ChartContainer = styled.div`
  height: 250px;
`
