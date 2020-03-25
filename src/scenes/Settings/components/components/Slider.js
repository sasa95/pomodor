import React from 'react'
import Typography from '@material-ui/core/Typography'
import MatSlider from '@material-ui/core/Slider'
import Box from '@material-ui/core/Box'
import { useDispatch } from 'react-redux'

const Slider = ({ name, defaultValue, step, marks, min, max, unit }) => {
  // const dispatch = useDispatch()

  const valueText = (value) => {
    return `${value} ${unit}`
  }

  return (
    <Box mt={2}>
      <Typography id={`${name}-slider`} gutterBottom>
        {name}
      </Typography>
      <MatSlider
        defaultValue={defaultValue}
        getAriaValueText={valueText}
        aria-labelledby={`${name}-slider`}
        valueLabelDisplay="auto"
        step={step}
        marks={marks}
        min={min}
        max={max}
        onChangeCommitted={() => {}}
      />
    </Box>
  )
}

export { Slider }
