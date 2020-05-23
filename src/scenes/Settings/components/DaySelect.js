import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import Box from '@material-ui/core/Box'
import MatFormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { startSetFirstDayOfTheWeek } from '../../../data/settings/actions'
import { useTheme } from '@material-ui/core'

export const DaySelect = () => {
  const [day, setDay] = useState('')

  const firstDayOfTheWeek = useSelector(
    (state) => state.settings.firstDayOfTheWeek
  )

  const darkMode = useSelector((state) => +state.settings.darkMode)

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

  const theme = useTheme()

  return (
    <Box my={2}>
      <FormControl variant="outlined" dark={darkMode} theme={theme}>
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

  ${({ dark, theme }) =>
    dark &&
    css`
      .MuiFormLabel-root.Mui-focused {
        color: ${theme.palette.primary.light};
      }

      .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: ${theme.palette.primary.light};
      }
    `}
`
