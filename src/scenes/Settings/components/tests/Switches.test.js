import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import { Switches } from '../Switches'
import { Switch } from '../components/Switch'

describe('<Switches />', () => {
  const mockStore = configureMockStore([thunk])
  const storeData = {
    settings: {
      showTimerInTitle: true,
      showNotifications: true,
      darkMode: false,
    },
  }

  let store
  let mount
  let wrapper

  beforeEach(() => {
    store = mockStore(storeData)
    mount = createMount()

    wrapper = mount(
      <Provider store={store}>
        <Switches />
      </Provider>
    )
  })

  test('should render <Switches /> correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should render 3 switches', () => {
    expect(wrapper.find(Switch).length).toBe(3)
  })
})
