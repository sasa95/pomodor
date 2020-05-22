import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import Menu from '@material-ui/core/Menu'
import { UserAvatar, Avatar } from '../UserAvatar'

describe('<UserAvatar />', () => {
  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(<UserAvatar />)
  }

  const dispatchMocked = jest.fn()
  jest.spyOn(redux, 'useDispatch').mockImplementation(() => dispatchMocked)

  const createStore = () => {
    const store = {
      auth: {
        name: 'Alex',
        photo: 'https://via.placeholder.com/100',
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

  test('should render <UserAvatar /> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })

  test('should render user image with correct alt attribute', () => {
    const { name, photo } = createStore().auth

    expect(createWrapper().find(Avatar).props()).toMatchObject({
      src: photo,
      alt: name,
    })
  })

  test('menu should be closed initially', () => {
    createStore()
    expect(createWrapper().find(Menu).props().open).toBe(false)
  })

  test('should open menu on avatar click', () => {
    createStore()
    const wrapper = createWrapper()

    wrapper.find(Avatar).simulate('click', { currentTarget: {} })
    expect(wrapper.find(Menu).props().open).toBe(true)
  })
})
