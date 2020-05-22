import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import { CountdownCircle, Time, TimerType } from '../CountdownCircle'
import { STATUSES, TYPES } from '../../data/timer/reducer'

describe('<CountdownCircle />', () => {
  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(<CountdownCircle />)
  }

  const dispatchMocked = jest.fn()
  jest.spyOn(redux, 'useDispatch').mockImplementation(() => dispatchMocked)

  const createStore = (
    type = TYPES.work,
    status = STATUSES.onHold,
    timeLeft = null,
    progress = 100
  ) => {
    const store = {
      timer: {
        timeLeft,
        progress,
        status,
        type,
      },
      settings: {
        workDuration: 25,
        shortBreakDuration: 5,
        longBreakDuration: 20,
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

  test('should render <CountdownCircle /> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })

  test('should display work duration and FOCUS', () => {
    createStore(TYPES.work, STATUSES.onHold, {
      minutes: 25,
      seconds: 0,
    })

    const wrapper = createWrapper()

    expect(wrapper.find(Time).text()).toBe('25:00')
    expect(wrapper.find(TimerType).text().toUpperCase()).toBe('FOCUS')
  })

  test('should display short break duration and BREAK', () => {
    createStore(TYPES.shortBreak, STATUSES.onHold, {
      minutes: 5,
      seconds: 0,
    })

    const wrapper = createWrapper()

    expect(wrapper.find(Time).text()).toBe('05:00')
    expect(wrapper.find(TimerType).text().toUpperCase()).toBe('BREAK')
  })

  test('should display long break duration and BREAK', () => {
    createStore(TYPES.longBreak, STATUSES.onHold, {
      minutes: 20,
      seconds: 0,
    })

    const wrapper = createWrapper()

    expect(wrapper.find(Time).text()).toBe('20:00')
    expect(wrapper.find(TimerType).text().toUpperCase()).toBe('BREAK')
  })
})
