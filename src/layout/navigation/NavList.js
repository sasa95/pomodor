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
import { NavLink } from 'react-router-dom'

const MatNavList = styled(List)`
  display: flex;
  justify-content: space-between;
  padding: 0;

  .MuiListItemText-primary {
    text-transform: uppercase;
  }

  ${({ theme }) => theme.breakpoints.up('sm')} {
    flex-direction: column;
    top: 40px;
    width: 92px;

    & > * {
      margin: 10px 0;
    }

    .MuiListItemText-primary {
      text-transform: capitalize;
    }
  }
`

const NavListItem = styled(ListItem)`
  display: flex;
  flex-direction: column;

  .MuiListItemText-primary {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.85rem;
    letter-spacing: 1px;
    font-weight: 500;
  }
`

const NavItemIcon = styled(ListItemIcon)`
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
`

const Link = styled(NavLink)`
  flex: 1;
  text-align: center;
  text-decoration: none;

  &.active ${NavItemIcon} {
    color: #fff;
  }

  &.active .MuiListItemText-primary {
    color: #fff;
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
      <Link to="/" exact={true}>
        <NavListItem button>
          <NavItemIcon>
            <TimerIcon />
          </NavItemIcon>
          <ListItemText primary="Timer" />
        </NavListItem>
      </Link>

      <Link to="/stats">
        <NavListItem button>
          <NavItemIcon>
            <ShowChartIcon />
          </NavItemIcon>
          <ListItemText primary="Stats" />
        </NavListItem>
      </Link>

      <Link to="/settings">
        <NavListItem button>
          <NavItemIcon>
            <SettingsIcon />
          </NavItemIcon>
          <ListItemText primary="Settings" />
        </NavListItem>
      </Link>
    </MatNavList>
  )
}

export { NavList }
