import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import styled from 'styled-components'

import red from '@material-ui/core/colors/red'
import deepPurple from '@material-ui/core/colors/deepPurple'
import blue from '@material-ui/core/colors/blue'
import cyan from '@material-ui/core/colors/cyan'
import teal from '@material-ui/core/colors/teal'
import green from '@material-ui/core/colors/green'
import yellow from '@material-ui/core/colors/yellow'
import deepOrange from '@material-ui/core/colors/deepOrange'
import { useDispatch, useSelector } from 'react-redux'
import { setFormValue } from '../../data/labels/actions'

const COLORS = [
  { name: 'Red', hex: red[500], id: '111' },
  { name: 'Deep Purple', hex: deepPurple[500], id: '222' },
  { name: 'Blue', hex: blue[500], id: '333' },
  { name: 'Cyan', hex: cyan[500], id: '444' },
  { name: 'Teal', hex: teal[500], id: '555' },
  { name: 'Deep Orange', hex: deepOrange[500], id: '666' },
  { name: 'Green', hex: green[500], id: '777' },
  { name: 'Yellow', hex: yellow[500], id: '888' },
]

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

export const LabelForm = () => {
  const { labelEditting } = useSelector((state) => state.labels)

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

  return (
    <form noValidate autoComplete="off">
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
        {COLORS.map((color) => (
          <MenuItem key={color.id} value={color.hex}>
            <ColorIndicator color={color.hex} />
            <span>{color.name}</span>
          </MenuItem>
        ))}
      </ColorTextField>
    </form>
  )
}
