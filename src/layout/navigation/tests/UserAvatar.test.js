import React from 'react'
import { createMount } from '@material-ui/core/test-utils'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { UserAvatar } from '../UserAvatar'

const mockStore = configureMockStore([thunk])

describe('<UserAvatar />', () => {
  let store
  let mount
  let wrapper
  const avatarSelector = 'Styled(WithStyles(ForwardRef(Avatar)))'
  const menuSelector = 'WithStyles(ForwardRef(Menu))'

  beforeAll(() => {
    store = mockStore({
      auth: {
        name: 'Alex',
        photo: 'https://via.placeholder.com/100',
      },
    })

    mount = createMount()

    wrapper = mount(
      <Provider store={store}>
        <UserAvatar />
      </Provider>
    )
  })

  test('should render <UserAvatar /> correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should render user image with correct alt attribute', () => {
    const { name, photo } = store.getState().auth

    expect(wrapper.find(avatarSelector).props()).toMatchObject({
      src: photo,
      alt: name,
    })
  })

  test('menu should be closed initially', () => {
    expect(wrapper.find(menuSelector).props().open).toBe(false)
  })

  test('should open menu on avatar click', () => {
    wrapper.find(avatarSelector).simulate('click')
    expect(wrapper.find(menuSelector).props().open).toBe(true)
  })
})
