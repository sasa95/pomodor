import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import { AppBar } from '../../components/Layout/components/AppBar/AppBar'

describe('<AppBar />', () => {
  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(<AppBar />)
  }

  const dispatchMocked = jest.fn()
  jest.spyOn(redux, 'useDispatch').mockImplementation(() => dispatchMocked)

  const createStore = () => {
    const store = {
      settings: { darkMode: false },
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

  test('should render <AppBar /> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })
})
