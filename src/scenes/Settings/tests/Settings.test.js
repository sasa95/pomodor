import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import { Settings } from '../Settings'

describe('<Settings />', () => {
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
        <Settings />
      </Provider>
    )
  })

  afterEach(() => {
    mount.cleanUp()
  })

  test('should render <Settings /> correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
