import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import IconButton from '@material-ui/core/IconButton'
import { ResetButton } from '../ResetButton'
import { TYPES, STATUSES } from '../../data/timer/reducer'
import { SaveSessionAlert } from '../SaveSessionAlert'
import { Dialog } from '@material-ui/core'

describe('<ResetButton />', () => {
  const mockStore = configureMockStore([thunk])

  let store
  let mount
  let wrapper

  beforeEach(() => {
    mount = createMount()

    wrapper = (
      status = STATUSES.onHold,
      type = TYPES.workDuration,
      timeLeft = { minutes: 25, seconds: 0 }
    ) => {
      const storeData = {
        timer: { status, type, timeLeft, saveSessionAlert: false },
        settings: {
          workDuration: 25,
          shortBreakDuration: 5,
          longBreakDuration: 20,
          showTimerInTitle: true,
        },
        labels: {
          labelSelected: null,
        },
      }

      store = mockStore(storeData)
      store.dispatch = jest.fn()

      return mount(
        <Provider store={store}>
          <ResetButton />
        </Provider>
      )
    }
  })

  test('should render <ResetButton /> correctly', () => {
    expect(wrapper()).toMatchSnapshot()
  })

  test('should be disabled if the timer is on hold', () => {
    const wrapperRendered = wrapper()
    expect(wrapperRendered.find(IconButton).prop('disabled')).toBe(true)
  })

  test('should be enabled if the timer is running', () => {
    const wrapperRendered = wrapper(STATUSES.running, TYPES.work, {
      minutes: 22,
      seconds: 10,
    })

    expect(wrapperRendered.find(IconButton).prop('disabled')).toBe(false)
  })

  test('should be enabled if the timer is paused', () => {
    const wrapperRendered = wrapper(STATUSES.paused, TYPES.work, {
      minutes: 22,
      seconds: 10,
    })

    expect(wrapperRendered.find(IconButton).prop('disabled')).toBe(false)
  })

  test('should display save session alert with the remaining time if the work timer has been running for 1 or more minutes', () => {
    const wrapperRendered = wrapper(STATUSES.running, TYPES.work, {
      minutes: 22,
      seconds: 10,
    })

    wrapperRendered.find(IconButton).simulate('click')

    expect(wrapperRendered.find(SaveSessionAlert).prop('time')).toEqual({
      minutes: 2,
      seconds: 50,
    })
  })

  test('should not display save session alert if the timer has been running for less than a minute', () => {
    const wrapperRendered = wrapper(STATUSES.running, TYPES.work, {
      minutes: 24,
      seconds: 10,
    })

    wrapperRendered.find(IconButton).simulate('click')

    expect(wrapperRendered.find(SaveSessionAlert).prop('time')).toEqual({
      minutes: 0,
      seconds: 0,
    })
  })

  test('should not display save session alert if the timer type is short break', () => {
    const wrapperRendered = wrapper(STATUSES.running, TYPES.shortBreak, {
      minutes: 3,
      seconds: 10,
    })

    wrapperRendered.find(IconButton).simulate('click')

    expect(wrapperRendered.find(SaveSessionAlert).prop('time')).toEqual({
      minutes: 0,
      seconds: 0,
    })
  })

  test('should not display save session alert if the timer type is long break', () => {
    const wrapperRendered = wrapper(STATUSES.running, TYPES.longBreak, {
      minutes: 11,
      seconds: 10,
    })

    wrapperRendered.find(IconButton).simulate('click')

    expect(wrapperRendered.find(SaveSessionAlert).prop('time')).toEqual({
      minutes: 0,
      seconds: 0,
    })
  })
})
