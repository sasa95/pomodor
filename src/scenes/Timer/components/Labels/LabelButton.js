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
import * as materialColors from '@material-ui/core/colors'

export const LabelButton = () => {
  const { labelSelected, data } = useSelector((state) => state.labels)
  const { status } = useSelector((state) => state.timer)
  const darkMode = useSelector((state) => +state.settings.darkMode)
  const darkModeCached = +JSON.parse(localStorage.getItem('darkMode'))

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
        variant="outlined"
        disabled={status !== STATUSES.onHold}
        labelcolor={labelSelected ? labelSelected.color : null}
        size="small"
        startIcon={<LabelIcon />}
        onClick={handleClick}
        ref={buttonRef}
        dark={darkMode || darkModeCached}
        theme={theme}
      >
        {getButtonText()}
      </Button>

      <LabelsMenu anchor={buttonRef.current} />
    </Box>
  )
}

export const Button = styled(MatButton)`
  color: ${({ labelcolor, dark, theme }) =>
    (labelcolor &&
      (dark
        ? materialColors[labelcolor][200]
        : materialColors[labelcolor][500])) ||
    (dark ? theme.palette.primary.light : theme.palette.primary.main)};
`
