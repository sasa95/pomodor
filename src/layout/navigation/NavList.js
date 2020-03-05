import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import TimerIcon from '@material-ui/icons/Timer'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import SettingsIcon from '@material-ui/icons/Settings'
import { useTheme } from '@material-ui/core'
import styled from 'styled-components'

const MatNavList = styled(List)`
  display: flex;
  padding: 0;

  .MuiListItemText-primary {
    text-transform: uppercase;
  }

  ${({ theme }) => theme.breakpoints.up('sm')} {
    flex-direction: column;
    align-self: flex-start;
    width: 92px;

    & > * {
      margin: 10px 0;
    }

    .MuiListItemText-primary {
      text-transform: capitalize;
    }
  }
`

const NavItemIcon = styled(ListItemIcon)`
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
`

const NavListItem = styled(ListItem)`
  display: flex;
  flex-direction: column;

  ${NavItemIcon} {
    color: ${({ active }) => (active ? '#fff' : 'rgba(255,255,255,.5)')};
  }

  .MuiListItemText-primary {
    color: ${({ active }) => (active ? '#fff' : 'rgba(255,255,255,.5)')};
    font-size: 0.85rem;
    letter-spacing: 1px;
    font-weight: 500;
  }
`

const NavList = () => {
  const theme = useTheme()

  return (
    <MatNavList
      component="nav"
      className="NavList"
      aria-label="Main navigation"
      theme={theme}
    >
      <NavListItem button active="true">
        <NavItemIcon>
          <TimerIcon />
        </NavItemIcon>
        <ListItemText primary="Timer" />
      </NavListItem>

      <NavListItem button>
        <NavItemIcon>
          <ShowChartIcon />
        </NavItemIcon>
        <ListItemText primary="Stats" />
      </NavListItem>

      <NavListItem button>
        <NavItemIcon>
          <SettingsIcon />
        </NavItemIcon>
        <ListItemText primary="Settings" />
      </NavListItem>
    </MatNavList>
  )
}

export { NavList }
