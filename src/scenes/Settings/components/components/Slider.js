import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import MatSlider from '@material-ui/core/Slider'
import Box from '@material-ui/core/Box'
import { useDispatch } from 'react-redux'

const Slider = ({ name, step, marks, min, max, unit, action, value }) => {
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

  return (
    <Box mt={2}>
      <Typography id={`${name}-slider`} gutterBottom>
        {name}
      </Typography>
      <MatSlider
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
      />
    </Box>
  )
}

export { Slider }
