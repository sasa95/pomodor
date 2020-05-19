import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import { CountdownCircle, Time, TimerType } from '../CountdownCircle'
import { STATUSES, TYPES } from '../../data/timer/reducer'

describe('<CountdownCircle />', () => {
  const mockStore = configureMockStore([thunk])

  let store
  let mount
  let wrapper

  beforeEach(() => {
    mount = createMount()

    wrapper = (
      type = TYPES.work,
      status = STATUSES.onHold,
      timeLeft = null,
      progress = 100
    ) => {
      const storeData = {
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

      store = mockStore(storeData)
      store.dispatch = jest.fn()

      return mount(
        <Provider store={store}>
          <CountdownCircle />
        </Provider>
      )
    }
  })

  afterEach(() => {
    mount.cleanUp()
  })

  test('should render <CountdownCircle /> correctly', () => {
    expect(wrapper()).toMatchSnapshot()
  })

  test('should display work duration and FOCUS', () => {
    const wrapperRendered = wrapper(TYPES.work, STATUSES.onHold, {
      minutes: 25,
      seconds: 0,
    })

    expect(wrapperRendered.find(Time).text()).toBe('25:00')
    expect(wrapperRendered.find(TimerType).text().toUpperCase()).toBe('FOCUS')
  })

  test('should display short break duration and BREAK', () => {
    const wrapperRendered = wrapper(TYPES.shortBreak, STATUSES.onHold, {
      minutes: 5,
      seconds: 0,
    })

    expect(wrapperRendered.find(Time).text()).toBe('05:00')
    expect(wrapperRendered.find(TimerType).text().toUpperCase()).toBe('BREAK')
  })

  test('should display long break duration and BREAK', () => {
    const wrapperRendered = wrapper(TYPES.longBreak, STATUSES.onHold, {
      minutes: 20,
      seconds: 0,
    })

    expect(wrapperRendered.find(Time).text()).toBe('20:00')
    expect(wrapperRendered.find(TimerType).text().toUpperCase()).toBe('BREAK')
  })
})
