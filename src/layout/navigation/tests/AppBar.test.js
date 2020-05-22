import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import { AppBar } from '../AppBar'

describe('<AppBar />', () => {
  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(<AppBar />)
  }

  const createStore = () => {
    const store = {
      settings: { darkMode: false },
    }

    jest
      .spyOn(redux, 'useSelector')
      .mockImplementation((callback) => callback(store))

    return store
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render <AppBar /> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })
})
