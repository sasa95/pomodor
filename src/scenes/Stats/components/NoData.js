import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useTheme } from '@material-ui/core'
import MatBox from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import illustration from '../no-data.svg'

const Box = styled(MatBox)`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -40%);
`

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: ${({ color }) => color};
`

export const NoData = () => {
  const theme = useTheme()

  return (
    <Box
      maxHeight="80vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      alignSelf="center"
    >
      <img src={illustration} alt="" />
      <Typography align="center">
        Nothing to show here. Come back after you{' '}
        <LinkStyled to="/timer" color={theme.palette.secondary.main}>
          complete a few sessions
        </LinkStyled>
        .
      </Typography>
    </Box>
  )
}
