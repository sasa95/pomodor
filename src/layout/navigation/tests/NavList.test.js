import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import { NavList, NavListItem } from '../NavList'
import { STATUSES } from '../../../scenes/Timer/data/timer/reducer'

describe('<NavList />', () => {
  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(<NavList />)
  }

  const createStore = (status = STATUSES.onHold) => {
    const store = {
      timer: { status },
    }

    jest
      .spyOn(redux, 'useSelector')
      .mockImplementation((callback) => callback(store))

    return store
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render <NavList/> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })

  test('should render 3 Nav List Items', () => {
    createStore()
    expect(createWrapper().find(NavListItem)).toHaveLength(3)
  })

  test('Second and third menu items should be disabled if the timer is running', () => {
    createStore(STATUSES.running)
    const wrapper = createWrapper()

    expect(wrapper.find(NavListItem).at(1).prop('disabled')).toBeTruthy()

    expect(wrapper.find(NavListItem).at(2).prop('disabled')).toBeTruthy()
  })
})
