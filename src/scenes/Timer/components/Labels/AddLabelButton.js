import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useTheme, useMediaQuery } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import LabelIcon from '@material-ui/icons/Label'
import {
  setFullscreenDialog,
  setDesktopDialog,
  setMenuOpened,
} from '../../data/labels/actions'
import { LabelsMenu } from './LabelsMenu'

const LabelButton = styled(Button)`
  color: ${({ labelcolor }) => labelcolor};
`

export const AddLabelButton = () => {
  const { labelSelected, data } = useSelector((state) => state.labels)
  const { timeLeft } = useSelector((state) => state.timer)

  const theme = useTheme()
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'))

  const dispatch = useDispatch()

  const buttonRef = useRef(null)

  const openDialog = () => {
    if (isMediumScreen) {
      dispatch(setDesktopDialog(true))
    } else {
      dispatch(setFullscreenDialog(true))
    }
  }

  const handleClick = () => {
    if (data && data.length) {
      dispatch(setMenuOpened(true))
    } else {
      openDialog()
    }
  }

  const getButtonText = () => {
    if (labelSelected) {
      return labelSelected.name
    }

    if (data && data.length) {
      return 'Select label'
    }

    return 'Add label'
  }

  return (
    <Box display="flex" justifyContent="center">
      <LabelButton
        disabled={!timeLeft}
        labelcolor={
          labelSelected ? labelSelected.color : theme.palette.secondary.main
        }
        size="small"
        startIcon={<LabelIcon />}
        onClick={handleClick}
        ref={buttonRef}
      >
        {getButtonText()}
      </LabelButton>

      <LabelsMenu anchor={buttonRef.current} />
    </Box>
  )
}
