import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import TimerIcon from '@material-ui/icons/AccessAlarms'
import ShowChartIcon from '@material-ui/icons/AssessmentOutlined'
import SettingsIcon from '@material-ui/icons/SettingsOutlined'
import { useTheme } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import { STATUSES } from '../../scenes/Timer/data/timer/reducer'

export const NavList = () => {
  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.up('sm'))
  const sidenav = +useMediaQuery('(min-width:600px) and (min-height:500px)')

  const timerRunning = useSelector(
    (state) => state.timer.status !== STATUSES.onHold
  )

  return (
    <MatNavList
      component="nav"
      className="NavList"
      aria-label="Main navigation"
      theme={theme}
      sidenav={sidenav}
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
          <NavListItem button disabled={timerRunning} data-item="settings">
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

const MatNavList = styled(List)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 0 0 47px;
  width: 254px;
  height: 100%;


  /* ${({ sidenav }) =>
    sidenav &&
    css`
      flex-direction: column;
      top: 40px;
      width: 92px;

      & > * {
        margin: 10px 0;
      }

      .MuiListItemText-primary {
        text-transform: capitalize;
      }
    `} */
`

const NavListItem = styled(ListItem)`
  /* display: flex;
  flex-direction: column; */

  margin-bottom: 50px;

  &[data-item='settings'] {
    margin-bottom: 0;
  }

  .MuiListItemText-primary {
    color: rgba(255, 255, 255, 0.75);
    font-size: 1rem;
    letter-spacing: 1px;
    font-weight: 500;
  }
`

const NavItemIcon = styled(ListItemIcon)`
  color: rgba(255, 255, 255, 0.75);
  min-width: initial;
  margin-right: 20px;

  .MuiSvgIcon-root {
    font-size: 26px;
  }
`

const Link = styled(NavLink)`
  text-decoration: none;
  font-size: 1rem;

  &.active:not([data-disabled='true']) ${NavItemIcon} {
    color: #fff;
  }

  &.active .MuiListItemText-primary {
    color: #fff;
  }
`
export { NavListItem }
