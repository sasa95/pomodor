import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import IconButton from '@material-ui/core/IconButton'
import { ToggleButton } from '../ToggleButton'
import { STATUSES, TYPES } from '../../data/timer/reducer'

describe('<ToggleButton />', () => {
  const mockStore = configureMockStore([thunk])

  let store
  let mount
  let wrapper

  beforeEach(() => {
    mount = createMount()

    wrapper = (status = STATUSES.onHold) => {
      const storeData = {
        timer: {
          status,
          type: TYPES.work,
          timeLeft: { minutes: 25, seconds: 0 },
        },
        settings: {},
        labels: { labelSelected: null },
      }

      store = mockStore(storeData)
      store.dispatch = jest.fn()

      return mount(
        <Provider store={store}>
          <ToggleButton />
        </Provider>
      )
    }
  })

  test('should render <ToggleButton /> correctly', () => {
    expect(wrapper()).toMatchSnapshot()
  })

  test('should render Pause button if the timer is running', () => {
    const wrapperRendered = wrapper(STATUSES.running)
    expect(wrapperRendered.find(IconButton).prop('aria-label')).toBe(
      'pause timer'
    )
  })

  test('should render Start button if the timer not running', () => {
    const wrapperRendered = wrapper()
    expect(wrapperRendered.find(IconButton).prop('aria-label')).toBe(
      'start timer'
    )
  })
})
