import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useTheme, useMediaQuery } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import MatButton from '@material-ui/core/Button'
import LabelIcon from '@material-ui/icons/Label'
import {
  setFullscreenDialog,
  setDesktopDialog,
  setMenuOpened,
} from '../../../../data/labels/actions'
import { LabelsMenu } from './LabelsMenu'
import { STATUSES } from '../../data/timer/reducer'

export const LabelButton = () => {
  const { labelSelected, data } = useSelector((state) => state.labels)
  const { status } = useSelector((state) => state.timer)

  const dispatch = useDispatch()

  const buttonRef = useRef(null)

  const theme = useTheme()
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'))

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
      <Button
        disabled={status !== STATUSES.onHold}
        labelcolor={
          labelSelected ? labelSelected.color : theme.palette.secondary.main
        }
        size="small"
        startIcon={<LabelIcon />}
        onClick={handleClick}
        ref={buttonRef}
      >
        {getButtonText()}
      </Button>

      <LabelsMenu anchor={buttonRef.current} />
    </Box>
  )
}

export const Button = styled(MatButton)`
  color: ${({ labelcolor }) => labelcolor};
`
