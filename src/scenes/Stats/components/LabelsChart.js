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
import { filters, getFilterFn } from '../data/filters'
import {
  generateChartTitle,
  generateChartTimeLabel,
  generateChartSessionsLabel,
} from '../data/chartFunctions'
import * as dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import grey from '@material-ui/core/colors/grey'

dayjs.extend(isSameOrAfter)
require('dayjs/locale/en-gb')
require('dayjs/locale/en')

export const LabelsChart = () => {
  const labels = useSelector((state) => state.labels.data)

  const sessions = useSelector((state) => state.sessions)

  const firstDayOfTheWeek = useSelector(
    (state) => state.settings.firstDayOfTheWeek
  )

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }],
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
      if (firstDayOfTheWeek === 'Monday') {
        dayjs.locale('en-gb')
      } else {
        dayjs.locale('en')
      }

      const labelsData = labels.map((label) => {
        return {
          ...label,
          sessions: 0,
          time: 0,
        }
      })

      if (!labelsData.length) return

      labelsData.push({
        id: null,
        color: grey[500],
        name: 'Unlabeled',
        sessions: 0,
        time: 0,
      })

      const filterFn = getFilterFn(filter)

      sessions.forEach(({ createdAt, duration, label }) => {
        if (filterFn(createdAt, dayjs)) {
          const index = labelsData.findIndex((l) => l.id === label)

          labelsData[index] = {
            ...labelsData[index],
            sessions: labelsData[index].sessions + 1,
            time: labelsData[index].time + getSeconds(duration),
          }
        }
      })

      setCalculatedData(labelsData)

      setChartData((prev) => {
        const newData = { ...prev }
        newData.datasets[0].data = labelsData.map((d) => d[dataType])
        newData.datasets[0].backgroundColor = labelsData.map((l) => l.color)
        newData.labels = labelsData.map((l) => l.name)

        return newData
      })
    }
  }, [sessions, firstDayOfTheWeek, filter, dataType, labels])

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
        title="Labels"
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
