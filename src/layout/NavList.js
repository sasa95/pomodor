import React from 'react'
import styled from 'styled-components'
import { List, ListItemIcon, ListItem, ListItemText } from '@material-ui/core'
import { Timer, ShowChart, Settings } from '@material-ui/icons'

const MatNavList = styled(List)`
  display: flex;
  padding: 0;
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

  & .MuiListItemText-primary {
    color: ${({ active }) => (active ? '#fff' : 'rgba(255,255,255,.5)')};
  }
`

const NavList = () => (
  <MatNavList component="nav" className="NavList" aria-label="Main navigation">
    <NavListItem button active="true">
      <NavItemIcon>
        <Timer />
      </NavItemIcon>
      <ListItemText primary="TIMER" />
    </NavListItem>

    <NavListItem button>
      <NavItemIcon>
        <ShowChart />
      </NavItemIcon>
      <ListItemText primary="STATS" />
    </NavListItem>

    <NavListItem button>
      <NavItemIcon>
        <Settings />
      </NavItemIcon>
      <ListItemText primary="SETTINGS" />
    </NavListItem>
  </MatNavList>
)

export { NavList }
