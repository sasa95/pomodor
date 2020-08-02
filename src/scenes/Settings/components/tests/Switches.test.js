import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import { Switches } from '../Switches'
import { Switch } from '../components/Switch'

describe('<Switches />', () => {
  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(<Switches />)
  }

  const createStore = () => {
    const store = {
      settings: {
        showTimerInTitle: true,
        showNotifications: true,
        darkMode: false,
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

  test('should render <Switches /> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })

  test('should render 4 switches', () => {
    createStore()
    expect(createWrapper().find(Switch).length).toBe(4)
  })
})
