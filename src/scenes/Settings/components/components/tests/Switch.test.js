import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import MatSwitch from '@material-ui/core/Switch'
import { Switch } from '../Switch'

describe('<Switch />', () => {
  const mockStore = configureMockStore([thunk])
  const startSetShowNotifications = jest.fn()

  const props = {
    name: 'Notifications',
    checked: false,
    action: startSetShowNotifications,
  }

  let store
  let mount
  let wrapper

  beforeEach(() => {
    store = mockStore({ settings: { darkMode: true } })
    store.dispatch = jest.fn()
    mount = createMount()

    wrapper = mount(
      <Provider store={store}>
        <Switch {...props} />
      </Provider>
    )
  })

  test('should render <Switch /> correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should call passed action with the right data when onChange is triggered', () => {
    wrapper.find(MatSwitch).prop('onChange')({
      target: { checked: true },
    })

    expect(startSetShowNotifications).toHaveBeenCalledWith(true)
  })
})
