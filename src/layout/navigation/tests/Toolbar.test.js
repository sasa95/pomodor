import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import OfflineIcon from '@material-ui/icons/WifiOff'
import { Toolbar, Logo } from '../Toolbar'
import { UserAvatar } from '../UserAvatar'
import { SignIn } from '../SignIn'

describe('<Toolbar />', () => {
  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(<Toolbar />)
  }

  const createStore = (name = null) => {
    const store = {
      auth: { name },
    }

    jest
      .spyOn(redux, 'useSelector')
      .mockImplementation((callback) => callback(store))

    return store
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render <Toolbar /> correctly when the user is online', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })

  test('should render <UserAvatar /> when the user is online and logged in', () => {
    jest.spyOn(navigator, 'onLine', 'get').mockReturnValue(true)
    createStore('Sasha')

    const wrapper = createWrapper()

    expect(wrapper.find(UserAvatar)).toHaveLength(1)
    expect(wrapper.find(OfflineIcon)).toHaveLength(0)
    expect(wrapper.find(SignIn)).toHaveLength(0)
  })

  test('should render <SignIn /> when the user is online and not logged in', () => {
    jest.spyOn(navigator, 'onLine', 'get').mockReturnValue(true)
    createStore()

    const wrapper = createWrapper()

    expect(wrapper.find(SignIn)).toHaveLength(1)
    expect(wrapper.find(OfflineIcon)).toHaveLength(0)
    expect(wrapper.find(UserAvatar)).toHaveLength(0)
  })

  test('should render <Toolbar /> correctly when the user is offline', () => {
    jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(false)
    createStore()

    expect(createWrapper()).toMatchSnapshot()
  })

  test('should render offline icon when the user is offline', () => {
    jest.spyOn(navigator, 'onLine', 'get').mockReturnValue(false)
    createStore()

    const wrapper = createWrapper()

    expect(wrapper.find(OfflineIcon)).toHaveLength(1)
    expect(wrapper.find(UserAvatar)).toHaveLength(0)
    expect(wrapper.find(SignIn)).toHaveLength(0)
  })

  test('should render Pomodor logo', () => {
    createStore()
    expect(createWrapper().find(Logo)).toHaveLength(1)
  })
})
