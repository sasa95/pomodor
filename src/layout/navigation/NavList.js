import React from 'react'
import styled from 'styled-components'
import {
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  useTheme,
} from '@material-ui/core'
import { Timer, ShowChart, Settings } from '@material-ui/icons'

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
  ${({ active }) => active && 'border-bottom: 2px solid #fff;'}

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
          <Timer />
        </NavItemIcon>
        <ListItemText primary="Timer" />
      </NavListItem>

      <NavListItem button>
        <NavItemIcon>
          <ShowChart />
        </NavItemIcon>
        <ListItemText primary="Stats" />
      </NavListItem>

      <NavListItem button>
        <NavItemIcon>
          <Settings />
        </NavItemIcon>
        <ListItemText primary="Settings" />
      </NavListItem>
    </MatNavList>
  )
}

export { NavList }
