import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import Menu from '@material-ui/core/Menu'
import { SignIn, TriggerButton } from '../SignIn'

describe('<SignIn />', () => {
  const mockStore = configureMockStore([thunk])

  const storeData = {
    auth: { uid: null },
  }

  let store
  let mount
  let wrapper

  beforeEach(() => {
    store = mockStore(storeData)

    mount = createMount()

    wrapper = mount(
      <Provider store={store}>
        <SignIn />
      </Provider>
    )
  })

  afterEach(() => {
    mount.cleanUp()
  })

  test('should render <SignIn /> correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('menu should be closed initially', () => {
    expect(wrapper.find(Menu).props().open).toBe(false)
  })

  test('should open menu on avatar click', () => {
    wrapper.find(TriggerButton).simulate('click')
    expect(wrapper.find(Menu).props().open).toBe(true)
  })
})
