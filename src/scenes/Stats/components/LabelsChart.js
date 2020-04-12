import React, { useState } from 'react'
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
import filters from '../data/filters'

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

export const LabelsChart = () => {
  const [dataType, setDataType] = useState('time')
  const [anchorEl, setAnchorEl] = useState(null)
  const [filter, setFilter] = useState(filters.find((f) => f.default))
  const labels = useSelector((state) => state.labels.data)

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

  const chartData = {
    labels: labels.map((l) => l.name),
    datasets: [
      {
        data: [11, 4],
        backgroundColor: labels.map((l) => l.color),
      },
    ],
  }

  const chartOptions = {
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
