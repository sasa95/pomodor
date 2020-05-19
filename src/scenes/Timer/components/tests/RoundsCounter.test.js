import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import { RoundsCounter, CounterLabel } from '../RoundsCounter'

describe('<RoundsCounter />', () => {
  const mockStore = configureMockStore([thunk])

  let store
  let mount
  let wrapper

  beforeEach(() => {
    mount = createMount()

    const storeData = {
      timer: { currentRound: 3, timeLeft: { minutes: 25, seconds: 0 } },
      settings: { rounds: 4 },
    }

    store = mockStore(storeData)
    store.dispatch = jest.fn()

    wrapper = mount(
      <Provider store={store}>
        <RoundsCounter />
      </Provider>
    )
  })

  test('should render <RoundsCounter /> correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should render current rounds/total rounds', () => {
    expect(wrapper.find(CounterLabel).text()).toBe('3/4')
  })
})
