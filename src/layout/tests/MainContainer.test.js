import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import { MainContainer } from '../MainContainer'

describe('<MainContainer />', () => {
  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(<MainContainer />)
  }

  const createStore = () => {
    const store = {
      settings: { darkMode: false },
      timer: { progress: 100 },
    }

    jest
      .spyOn(redux, 'useSelector')
      .mockImplementation((callback) => callback(store))

    return store
  }

  Element.prototype.scrollTo = () => {}

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render <MainContainer /> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })
})
