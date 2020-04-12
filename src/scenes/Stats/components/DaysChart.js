import React, { useState } from 'react'
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
import filters from '../data/filters'

import red from '@material-ui/core/colors/red'
import deepPurple from '@material-ui/core/colors/deepPurple'
import blue from '@material-ui/core/colors/blue'
import cyan from '@material-ui/core/colors/cyan'
import green from '@material-ui/core/colors/green'
import yellow from '@material-ui/core/colors/yellow'
import deepOrange from '@material-ui/core/colors/deepOrange'

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

const data = {
  labels: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
  datasets: [
    {
      data: [11, 5, 10, 24, 15, 8, 5],
      backgroundColor: [
        red[500],
        green[500],
        deepPurple[500],
        cyan[500],
        deepOrange[500],
        blue[500],
        yellow[500],
      ],
    },
  ],
}

const options = {
  maintainAspectRatio: false,
  tooltips: {
    callbacks: {
      label: function (tooltipItem, data) {
        var dataset = data.datasets[tooltipItem.datasetIndex]
        var meta = dataset._meta[Object.keys(dataset._meta)[0]]
        var total = meta.total
        var currentValue = dataset.data[tooltipItem.index]
        var percentage = parseFloat(((currentValue / total) * 100).toFixed(1))
        return currentValue + ' (' + percentage + '%)'
      },
      title: function (tooltipItem, data) {
        return data.labels[tooltipItem[0].index]
      },
    },
  },
}

export const DaysChart = () => {
  const [dataType, setDataType] = useState('time')
  const [anchorEl, setAnchorEl] = useState(null)
  const [filter, setFilter] = useState(filters.find((f) => f.default))

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

  const onChipClicked = (typeSelected) => {
    if (typeSelected === dataType) return

    setDataType(typeSelected)
  }

  const theme = useTheme()

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
          <Doughnut data={data} options={options} />
        </ChartContainer>
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
