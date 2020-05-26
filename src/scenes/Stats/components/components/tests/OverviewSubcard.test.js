import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import { OverviewSubcard } from '../OverviewSubcard'
import icon from '../../assets/icons/week/week-light.svg'

describe('<OverviewSubcard />', () => {
  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(
      <OverviewSubcard icon={icon} sum="13h 5m" label="Week" trend="9" />
    )
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

  test('should render <OverviewSubcard /> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })
})
