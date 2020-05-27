import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import styled, { css } from 'styled-components'
import colors from './Fixtures/colors'
import { setFormValue } from '../../../../data/labels/actions'
import { useTheme } from '@material-ui/core'

export const LabelForm = () => {
  const { labelEditting } = useSelector((state) => state.labels)
  const darkMode = useSelector((state) => +state.settings.darkMode)

  const [name, setName] = useState(labelEditting ? labelEditting.name : '')
  const [nameValid, setNameValid] = useState(true)
  const nameHelperText = 'Fill in label name'

  const [color, setColor] = useState(labelEditting ? labelEditting.color : '')

  const dispatch = useDispatch()

  const onNameChange = (e) => {
    const value = e.target.value

    setName(value)
    dispatch(setFormValue({ name: value, color }))

    if (!!value !== nameValid) {
      setNameValid(!nameValid)
    }
  }

  const onColorChange = (e) => {
    const value = e.target.value

    setColor(value)
    dispatch(setFormValue({ name, color: value }))
  }

  const onNameBlur = () => {
    if (!name) {
      setNameValid(false)
    }
  }

  const theme = useTheme()

  return (
    <Form
      noValidate
      autoComplete="off"
      darkMode={darkMode}
      color={theme.palette.primary.light}
    >
      <TextField
        error={!nameValid}
        helperText={!nameValid ? nameHelperText : ' '}
        required
        id="label-name"
        label="Label name"
        variant="filled"
        name="name"
        margin="normal"
        value={name}
        onChange={onNameChange}
        onBlur={onNameBlur}
        fullWidth
        autoFocus
      />

      <ColorTextField
        select
        required
        id="label-color"
        label="Label color"
        variant="filled"
        name="color"
        margin="normal"
        value={color}
        onChange={onColorChange}
        fullWidth
      >
        {colors.map((color) => (
          <MenuItem key={color.id} value={color.id}>
            <ColorIndicator
              color={darkMode ? color.hex.darkMode : color.hex.normal}
            />
            <span>{color.name}</span>
          </MenuItem>
        ))}
      </ColorTextField>
    </Form>
  )
}

const Form = styled.form`
  ${({ darkMode, color }) =>
    darkMode &&
    css`
      & label.Mui-focused:not(.Mui-error) {
        color: ${color};
      }

      & .MuiFilledInput-underline.Mui-focused:not(.Mui-error):after {
        border-bottom-color: ${color};
      }
    `}
`

const ColorTextField = styled(TextField)`
  #label-color {
    display: flex;
    align-items: center;
  }
`

const ColorIndicator = styled.span`
  background: ${({ color }) => color};
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 20px;
`

export { ColorTextField }
