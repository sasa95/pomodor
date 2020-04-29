import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useTheme } from '@material-ui/core'
import MatBox from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import illustration from './assets/404.svg'

export const Page404 = () => {
  const theme = useTheme()

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      alignSelf="center"
      width="90%"
      maxWidth="600px"
    >
      <img src={illustration} alt="Page not found" />
      <Typography align="center">
        How did you get here?! You should{' '}
        <LinkStyled to="/timer" color={theme.palette.secondary.main}>
          go back to work
        </LinkStyled>
        !
      </Typography>
    </Box>
  )
}

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
