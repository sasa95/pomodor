import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import MatFormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { startSetFirstDayOfTheWeek } from '../../../data/settings/actions'

export const DaySelect = () => {
  const [day, setDay] = useState('')

  const firstDayOfTheWeek = useSelector(
    (state) => state.settings.firstDayOfTheWeek
  )

  useEffect(() => {
    if (firstDayOfTheWeek !== null && firstDayOfTheWeek !== undefined) {
      setDay(firstDayOfTheWeek)
    }
  }, [firstDayOfTheWeek])

  const dispatch = useDispatch()

  const handleChange = (event) => {
    const day = event.target.value

    setDay(day)
    dispatch(startSetFirstDayOfTheWeek(day))
  }

  return (
    <Box my={2}>
      <FormControl variant="outlined">
        <InputLabel id="day-select">Week starts on</InputLabel>
        <Select
          labelId="day-select"
          value={day}
          onChange={handleChange}
          label="Week starts on"
        >
          <MenuItem value="Monday">Monday</MenuItem>
          <MenuItem value="Sunday">Sunday</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

const FormControl = styled(MatFormControl)`
  width: 100%;
`
