import React, { useState, useEffect } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MatSwitch from '@material-ui/core/Switch'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import { useTheme } from '@material-ui/core'

const Label = styled(FormControlLabel)`
  margin: 0;
`

const SettingSwitch = styled(MatSwitch)`
  .Mui-checked {
    color: ${({ theme, dark }) =>
      dark ? theme.palette.secondary.light : theme.palette.secondary.main};
  }

  .Mui-checked + .MuiSwitch-track {
    background: ${({ theme, dark }) =>
      dark ? theme.palette.secondary.light : theme.palette.secondary.main};
  }
`

const Switch = ({ name, action, checked }) => {
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
            dark={darkMode || darkModeCached}
          />
        }
        label={name}
        labelPlacement="start"
      />
    </Box>
  )
}

export { Switch }
