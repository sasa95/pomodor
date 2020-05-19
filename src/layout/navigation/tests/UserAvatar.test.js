import React from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { createMount } from '@material-ui/core/test-utils'
import Menu from '@material-ui/core/Menu'
import { UserAvatar, Avatar } from '../UserAvatar'

describe('<UserAvatar />', () => {
  const mockStore = configureMockStore([thunk])
  const storeData = {
    auth: {
      name: 'Alex',
      photo: 'https://via.placeholder.com/100',
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
        <UserAvatar />
      </Provider>
    )
  })

  afterEach(() => {
    mount.cleanUp()
  })

  test('should render <UserAvatar /> correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should render user image with correct alt attribute', () => {
    const { name, photo } = store.getState().auth

    expect(wrapper.find(Avatar).props()).toMatchObject({
      src: photo,
      alt: name,
    })
  })

  test('menu should be closed initially', () => {
    expect(wrapper.find(Menu).props().open).toBe(false)
  })

  test('should open menu on avatar click', () => {
    wrapper.find(Avatar).simulate('click')
    expect(wrapper.find(Menu).props().open).toBe(true)
  })
})
