import React from 'react'
import Typography from '@material-ui/core/Typography'
import MatSlider from '@material-ui/core/Slider'
import Box from '@material-ui/core/Box'
import { useDispatch, useSelector } from 'react-redux'

const Slider = ({
  name,
  field,
  defaultValue,
  step,
  marks,
  min,
  max,
  unit,
  action,
  value,
}) => {
  const currentValue = useSelector((state) => state.settings[field])

  const dispatch = useDispatch()

  const handleChange = (value) => {
    if (currentValue !== value) {
      dispatch(action(value))
    }
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
        defaultValue={defaultValue}
        getAriaValueText={valueText}
        aria-labelledby={`${name}-slider`}
        valueLabelDisplay="auto"
        step={step}
        marks={marks}
        min={min}
        max={max}
        onChangeCommitted={(event, value) => handleChange(value)}
        value={value}
      />
    </Box>
  )
}

export { Slider }
