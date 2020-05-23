import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import { ResetButton, ActionIcon } from '../ResetButton'
import { TYPES, STATUSES } from '../../data/timer/reducer'
import { SaveSessionAlert } from '../SaveSessionAlert'

describe('<ResetButton />', () => {
  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(<ResetButton />)
  }

  const dispatchMocked = jest.fn()
  jest.spyOn(redux, 'useDispatch').mockImplementation(() => dispatchMocked)

  const createStore = (
    status = STATUSES.onHold,
    type = TYPES.workDuration,
    timeLeft = { minutes: 25, seconds: 0 }
  ) => {
    const store = {
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

    jest
      .spyOn(redux, 'useSelector')
      .mockImplementation((callback) => callback(store))

    return store
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render <ResetButton /> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })

  test('should be disabled if the timer is on hold', () => {
    createStore()
    expect(createWrapper().find(ActionIcon).prop('disabled')).toBe(true)
  })

  test('should be enabled if the timer is running', () => {
    createStore(STATUSES.running, TYPES.work, {
      minutes: 22,
      seconds: 10,
    })

    expect(createWrapper().find(ActionIcon).prop('disabled')).toBe(false)
  })

  test('should be enabled if the timer is paused', () => {
    createStore(STATUSES.paused, TYPES.work, {
      minutes: 22,
      seconds: 10,
    })

    expect(createWrapper().find(ActionIcon).prop('disabled')).toBe(false)
  })

  test('should display save session alert with the remaining time if the work timer has been running for 1 or more minutes', () => {
    createStore(STATUSES.running, TYPES.work, {
      minutes: 22,
      seconds: 10,
    })

    const wrapper = createWrapper()

    wrapper.find(ActionIcon).simulate('click')

    expect(wrapper.find(SaveSessionAlert).prop('time')).toEqual({
      minutes: 2,
      seconds: 50,
    })
  })

  test('should not display save session alert if the timer has been running for less than a minute', () => {
    createStore(STATUSES.running, TYPES.work, {
      minutes: 24,
      seconds: 10,
    })

    const wrapper = createWrapper()

    wrapper.find(ActionIcon).simulate('click')

    expect(wrapper.find(SaveSessionAlert).prop('time')).toEqual({
      minutes: 0,
      seconds: 0,
    })
  })

  test('should not display save session alert if the timer type is short break', () => {
    createStore(STATUSES.running, TYPES.shortBreak, {
      minutes: 3,
      seconds: 10,
    })

    const wrapper = createWrapper()

    wrapper.find(ActionIcon).simulate('click')

    expect(wrapper.find(SaveSessionAlert).prop('time')).toEqual({
      minutes: 0,
      seconds: 0,
    })
  })

  test('should not display save session alert if the timer type is long break', () => {
    createStore(STATUSES.running, TYPES.longBreak, {
      minutes: 11,
      seconds: 10,
    })

    const wrapper = createWrapper()

    wrapper.find(ActionIcon).simulate('click')

    expect(wrapper.find(SaveSessionAlert).prop('time')).toEqual({
      minutes: 0,
      seconds: 0,
    })
  })
})
