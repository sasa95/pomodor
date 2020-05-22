import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import { Stats } from '../Stats'
import sessions from '../../../data/sessions/tests/mock-data/sessions'
import { NoData } from '../components/NoData'

describe('<Stats />', () => {
  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(<Stats />)
  }

  const dispatchMocked = jest.fn()
  jest.spyOn(redux, 'useDispatch').mockImplementation(() => dispatchMocked)

  const createStore = (sessions = []) => {
    const store = { sessions }

    jest
      .spyOn(redux, 'useSelector')
      .mockImplementation((callback) => callback(store))

    return store
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render <Stats /> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })

  test('should render <NoData /> if no sessions are provided', () => {
    createStore()
    expect(createWrapper().find(NoData).exists()).toBe(true)
  })

  test('should not render <NoData /> if the sessions are provided', () => {
    createStore(sessions)
    expect(createWrapper().find(NoData).exists()).toBe(false)
  })
})
