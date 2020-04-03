import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import ListIcon from '@material-ui/icons/List'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useSelector } from 'react-redux'
import { TimerLabel } from '../../../components/TimerLabel'

import red from '@material-ui/core/colors/red'
import deepPurple from '@material-ui/core/colors/deepPurple'
import blue from '@material-ui/core/colors/blue'
import cyan from '@material-ui/core/colors/cyan'
import teal from '@material-ui/core/colors/teal'
import green from '@material-ui/core/colors/green'
import yellow from '@material-ui/core/colors/yellow'
import deepOrange from '@material-ui/core/colors/deepOrange'
import styled from 'styled-components'

const LABELS = [
  { name: 'Job', color: red[500], id: '111' },
  { name: 'Learning Spanish', color: deepPurple[500], id: '222' },
  { name: 'Playing Guitar', color: blue[500], id: '333' },
  { name: 'Exams', color: cyan[500], id: '444' },
  { name: 'Drawing', color: teal[500], id: '555' },
  { name: 'Building My Website', color: deepOrange[500], id: '666' },
  { name: 'Reading', color: green[500], id: '777' },
  { name: 'Video Editing', color: yellow[500], id: '888' },
]

const LabelMenuItem = styled(MenuItem)`
  .MuiIconButton-root {
    visibility: ${({ touchscreen }) => (touchscreen ? 'visible' : 'hidden')};
  }

  &:hover .MuiIconButton-root {
    visibility: visible;
  }
`

const LabelsMenuButton = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [labelSelected, setLabelSelected] = useState(null)
  const { timeLeft } = useSelector((state) => state.timer)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (e, label) => {
    setAnchorEl(null)

    if (label && label.id && label.name && label.color) {
      setLabelSelected(label)
    }
  }
  return (
    <>
      <IconButton
        disabled={!timeLeft}
        aria-label="Select a label"
        onClick={handleClick}
      >
        <ListIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleClose}
      >
        {LABELS.map((label) => (
          <LabelMenuItem
            key={label.id}
            onClick={(e) => handleClose(e, label)}
            px={0}
            touchscreen={'ontouchstart' in document.documentElement ? 1 : 0}
          >
            <TimerLabel name={label.name} color={label.color} />
          </LabelMenuItem>
        ))}
      </Menu>
    </>
  )
}

export { LabelsMenuButton }
