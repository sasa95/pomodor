import React, { useState, useEffect } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MatSwitch from '@material-ui/core/Switch'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import Box from '@material-ui/core/Box'
import { useTheme } from '@material-ui/core'

export const Switch = ({ name, action, checked }) => {
  const [state, setState] = useState(false)

  const handleChange = (event) => {
    const checked = event.target.checked
    setState(checked)
    dispatch(action(checked))
  }

  const dispatch = useDispatch()

  const theme = useTheme()
  const darkMode = useSelector((state) => +state.settings.darkMode)
  const darkModeCached = +JSON.parse(localStorage.getItem('darkMode'))

  useEffect(() => {
    if (checked !== null && checked !== undefined) {
      setState(checked)
    }
  }, [checked])

  return (
    <Box>
      <Label
        ml={0}
        control={
          <SettingSwitch
            checked={state}
            onChange={handleChange}
            name={name}
            theme={theme}
            color="primary"
            dark={darkMode || darkModeCached}
          />
        }
        label={name}
        labelPlacement="start"
      />
    </Box>
  )
}

export const Label = styled(FormControlLabel)`
  margin: 0;
`

export const SettingSwitch = styled(MatSwitch)`
  ${({ dark, theme }) =>
    dark &&
    css`
      .Mui-checked,
      .Mui-checked + .MuiSwitch-track {
        color: ${theme.palette.primary.light};
      }
    `}
`
