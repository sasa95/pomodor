import React, { useState } from 'react'
import styled from 'styled-components'
import { useTheme } from '@material-ui/core'
import MatCard from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

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

  const onChipClicked = (typeSelected) => {
    if (typeSelected === dataType) return

    setDataType(typeSelected)
  }

  const theme = useTheme()

  return (
    <Card theme={theme}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Overview
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Box display="flex" flexDirection="column">
              <Sum color={theme.palette.primary.main}>1h 42m</Sum>
              <Label>Today</Label>
              <Avg color={theme.palette.text.secondary}>1h 51m avg</Avg>
            </Box>
          </Grid>

          <Grid item xs={3}>
            <Box display="flex" flexDirection="column">
              <Sum color={theme.palette.primary.main}>13h 6m</Sum>
              <Label>Week</Label>
              <Avg color={theme.palette.text.secondary}>11h 12m avg</Avg>
            </Box>
          </Grid>

          <Grid item xs={3}>
            <Box display="flex" flexDirection="column">
              <Sum color={theme.palette.primary.main}>16h 11m</Sum>
              <Label>Month</Label>
              <Avg color={theme.palette.text.secondary}>22h 3m avg</Avg>
            </Box>
          </Grid>

          <Grid item xs={3}>
            <Box display="flex" flexDirection="column">
              <Sum color={theme.palette.primary.main}>43h 44m</Sum>
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
