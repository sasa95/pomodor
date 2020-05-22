import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import { Switch, Label } from '../Switch'

describe('<Switch />', () => {
  const props = {
    name: 'Notifications',
    checked: false,
    action: jest.fn(),
  }

  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(<Switch {...props} />)
  }

  const dispatchMocked = jest.fn()
  jest.spyOn(redux, 'useDispatch').mockImplementation(() => dispatchMocked)

  const createStore = () => {
    const store = {
      settings: { darkMode: true },
    }

    jest
      .spyOn(redux, 'useSelector')
      .mockImplementation((callback) => callback(store))

    return store
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render <Switch /> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })

  test('should call passed action with the right data when onChange is triggered', () => {
    createStore()

    createWrapper()
      .find(Label)
      .prop('control')
      .props.onChange({ target: { checked: true } })

    expect(props.action).toHaveBeenCalledWith(true)
  })
})
