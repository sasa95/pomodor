import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import TimerIcon from '@material-ui/icons/Timer'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import SettingsIcon from '@material-ui/icons/Settings'
import { useTheme, Tooltip } from '@material-ui/core'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { STATUSES } from '../../scenes/Timer/reducer'

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

  &.active:not([data-disabled='true']) ${NavItemIcon} {
    color: #fff;
  }

  &.active .MuiListItemText-primary {
    color: #fff;
  }
`

const NavList = () => {
  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.up('sm'))

  const timerRunning = useSelector(
    (state) => state.timer.status !== STATUSES.onHold
  )

  return (
    <MatNavList
      component="nav"
      className="NavList"
      aria-label="Main navigation"
      theme={theme}
    >
      <Link to="/timer">
        <NavListItem button>
          <NavItemIcon>
            <TimerIcon />
          </NavItemIcon>
          <ListItemText primary="Timer" />
        </NavListItem>
      </Link>

      <Tooltip
        title="Reset timer to access the stats"
        disableHoverListener={!timerRunning}
        disableTouchListener
        disableFocusListener
        placement={isTablet ? 'right' : 'bottom'}
      >
        <Link
          to={timerRunning ? '#' : '/stats'}
          data-disabled={timerRunning && 'true'}
        >
          <NavListItem button disabled={timerRunning}>
            <NavItemIcon>
              <ShowChartIcon />
            </NavItemIcon>
            <ListItemText primary="Stats" />
          </NavListItem>
        </Link>
      </Tooltip>

      <Tooltip
        title="Reset timer to access the settings"
        disableHoverListener={!timerRunning}
        disableTouchListener
        disableFocusListener
        placement={isTablet ? 'right' : 'bottom'}
      >
        <Link
          to={timerRunning ? '#' : '/settings'}
          data-disabled={timerRunning && 'true'}
        >
          <NavListItem button disabled={timerRunning}>
            <NavItemIcon>
              <SettingsIcon />
            </NavItemIcon>
            <ListItemText primary="Settings" />
          </NavListItem>
        </Link>
      </Tooltip>
    </MatNavList>
  )
}

export { NavList }
