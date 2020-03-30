import React, { useState, useEffect } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MatSwitch from '@material-ui/core/Switch'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'

const Label = styled(FormControlLabel)`
  margin: 0;
`

const Switch = ({ name, action, checked }) => {
  const [state, setState] = useState(false)

  const handleChange = (event) => {
    const checked = event.target.checked
    setState(checked)
    dispatch(action(checked))
  }

  const dispatch = useDispatch()

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
          <MatSwitch
            checked={state}
            onChange={handleChange}
            name={name}
            color="primary"
          />
        }
        label={name}
        labelPlacement="start"
      />
    </Box>
  )
}

export { Switch }
