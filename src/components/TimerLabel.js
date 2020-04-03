import React from 'react'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import grey from '@material-ui/core/colors/grey'

const ColorIndicator = styled.span`
  background: ${({ color }) => color};
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 20px;
`

const EditButton = styled(IconButton)`
  color: ${grey[400]};
`

export const TimerLabel = ({ name, color }) => {
  const handleClick = () => {
    console.log('edit clicked!')
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      <Box display="flex">
        <ColorIndicator color={color}></ColorIndicator>
        <span>{name}</span>
      </Box>
      <EditButton aria-label="Edit label" onClick={handleClick}>
        <EditIcon />
      </EditButton>
    </Box>
  )
}
