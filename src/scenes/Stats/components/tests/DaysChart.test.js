import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import Menu from '@material-ui/core/Menu'
import { Doughnut } from 'react-chartjs-2'
import { DaysChart } from '../DaysChart'
import sessions from '../../../../data/sessions/tests/mock-data/sessions'
import CardHeader from '@material-ui/core/CardHeader'

jest.mock('react-chartjs-2', () => ({
  Doughnut: () => null,
}))

describe('<DaysChart />', () => {
  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(<DaysChart />)
  }

  const createStore = () => {
    const store = {
      settings: {
        firstDayOfTheWeek: 'Monday',
        darkMode: false,
      },
      sessions,
    }

    jest
      .spyOn(redux, 'useSelector')
      .mockImplementation((callback) => callback(store))

    return store
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render <DaysChart /> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })

  test('should render <Doughnut /> correctly', () => {
    createStore()
    expect(createWrapper().find(Doughnut).exists()).toBe(true)
  })

  test('there should be 7 chart labels', () => {
    createStore()
    expect(createWrapper().find(Doughnut).prop('data').labels.length).toBe(7)
  })

  test('should open menu on button click', () => {
    createStore()
    const wrapper = createWrapper()

    wrapper.find(CardHeader).prop('action').props.onClick({ currentTarget: {} })
    expect(wrapper.find(Menu).prop('open')).toBe(true)
  })
})
