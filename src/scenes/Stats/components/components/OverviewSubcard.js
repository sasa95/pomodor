import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import {
  CardContent as MatCardContent,
  Grid,
  Box,
  Card as MatCard,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import { TrendIcon } from './components/TrendIcon'

export const OverviewSubcard = ({ icon, sum, label, trend = 0 }) => {
  const theme = useTheme()
  const isMediumScreen = +useMediaQuery(theme.breakpoints.up('md'))
  const darkMode = useSelector((state) => +state.settings.darkMode)

  const [trendColor, setTrendColor] = useState('rgba(0,0,0,0)')
  const [trendIconPath, setTrendIconPath] = useState()

  useEffect(() => {
    if (trend === 0) return
    let color, path

    if (trend > 0) {
      if (darkMode) {
        color = trendProps.positive.dark
      } else {
        color = trendProps.positive.light
      }
      path = trendProps.positive.path
    } else {
      if (darkMode) {
        color = trendProps.negative.dark
      } else {
        color = trendProps.negative.light
      }
      path = trendProps.negative.path
    }

    setTrendColor(color)
    setTrendIconPath(path)
  }, [darkMode, trend])

  return (
    <DataCard md={isMediumScreen} dark={darkMode}>
      <CardContent md={isMediumScreen}>
        <MainGrid
          container
          direction={isMediumScreen ? 'column' : 'row'}
          spacing={2}
          alignItems="center"
        >
          <Grid item xs={2} md={5} lg={9}>
            <Icon
              max-width="100%"
              src={icon}
              alt="Today Icon"
              md={isMediumScreen}
            />
          </Grid>
          <Grid item xs={10} md={12}>
            <Sum dark={darkMode} md={isMediumScreen}>
              {sum}
            </Sum>
            <Label color={theme.palette.text.secondary} md={isMediumScreen}>
              {label}
            </Label>

            {trend !== 0 && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent={isMediumScreen ? 'center' : 'flex-start'}
              >
                <TrendIcon fill={trendColor} path={trendIconPath} />
                <Trend md={isMediumScreen} color={trendColor}>
                  {Math.abs(trend)}%
                </Trend>
              </Box>
            )}
          </Grid>
        </MainGrid>
      </CardContent>
    </DataCard>
  )
}

const DataCard = styled(MatCard)`
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
    0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
  background: inherit;

  ${({ md }) =>
    md
      ? css`
          width: 200px;
          height: 200px;
          margin-bottom: 20px;
          background: ${({ dark }) => (dark ? '#2c2c2c' : 'inherit')};
        `
      : css`
          box-shadow: none;
          margin: 0 16px;
        `}
`

const CardContent = styled(MatCardContent)`
  ${({ md }) =>
    !md &&
    css`
      padding: 8px 0 !important;
    `}
`

const MainGrid = styled(Grid)``

const Icon = styled.img`
  width: 100%;
  max-width: ${({ md }) => (md ? '50px' : '40px')};
`

const Sum = styled.span`
  display: block;
  font-weight: bold;
  font-size: 1rem;
  color: ${({ dark }) => (dark ? '#e4e4e4' : '#4e4e4e')};

  ${({ md }) =>
    md &&
    css`
      font-size: 2rem;
      text-align: center;
    `}
`

const Label = styled.span`
  font-size: 0.8rem;
  color: ${({ color }) => color};
  display: block;
  margin-bottom: 5px;

  ${({ md }) =>
    md &&
    css`
      text-align: center;
      font-size: 0.9rem;
    `}
`

const Trend = styled.span`
  display: block;
  font-weight: bold;
  font-size: 0.9rem;
  color: ${({ color }) => color};
  margin-left: 5px;

  ${({ md }) =>
    md &&
    css`
      margin-left: 7px;
      font-size: 1rem;
    `}
`

const trendProps = {
  positive: {
    light: '#3BC83C',
    dark: '#A5D6A7',
    path: 'M6 0.806397L12 6.8064L0 6.8064L6 0.806397Z',
  },
  negative: {
    light: '#F12524',
    dark: '#EF9A9A',
    path: 'M6 6.8064L0 0.806396L12 0.806399L6 6.8064Z',
  },
}

export { Sum }
