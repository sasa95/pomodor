import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import Typography from '@material-ui/core/Typography'
import MatSlider from '@material-ui/core/Slider'
import Box from '@material-ui/core/Box'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@material-ui/core'

export const Slider = ({
  name,
  step,
  marks,
  min,
  max,
  unit,
  action,
  value,
}) => {
  const [sliderValue, setSliderValue] = useState(value)

  useEffect(() => {
    setSliderValue(value)
  }, [value])

  const dispatch = useDispatch()

  const handleChangeCommitted = (event, newValue) => {
    if (newValue !== value) {
      dispatch(action(newValue))
    }
  }

  const handleChange = (event, newValue) => {
    setSliderValue(newValue)
  }

  const valueText = (value) => {
    return `${value} ${unit}`
  }

  const theme = useTheme()
  const darkMode = useSelector((state) => +state.settings.darkMode)
  const darkModeCached = +JSON.parse(localStorage.getItem('darkMode'))

  return (
    <Box mt={2}>
      <Typography id={`${name}-slider`} gutterBottom>
        {name}
      </Typography>
      <SettingSlider
        getAriaValueText={valueText}
        aria-labelledby={`${name}-slider`}
        valueLabelDisplay="auto"
        step={step}
        marks={marks}
        min={min}
        max={max}
        onChangeCommitted={handleChangeCommitted}
        onChange={handleChange}
        value={sliderValue}
        theme={theme}
        dark={darkMode || darkModeCached}
        color="primary"
      />
    </Box>
  )
}

export const SettingSlider = styled(MatSlider)`
  ${({ dark, theme }) =>
    dark &&
    css`
      color: ${theme.palette.primary.light};
    `}
`
