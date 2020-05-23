import React from 'react'
import * as redux from 'react-redux'
import { createMount } from '@material-ui/core/test-utils'
import Menu from '@material-ui/core/Menu'
import IconButton from '@material-ui/core/IconButton'
import { Doughnut } from 'react-chartjs-2'
import { LabelsChart } from '../LabelsChart'
import sessions from '../../../../data/sessions/tests/mock-data/sessions'
import labels from '../../../../data/labels/tests/mock-data/labels'

jest.mock('react-chartjs-2', () => ({
  Doughnut: () => null,
}))

describe('<LabelsChart />', () => {
  let mount
  const createWrapper = () => {
    return mount(<LabelsChart />)
  }

  const createStore = () => {
    const store = {
      settings: {
        firstDayOfTheWeek: 'Monday',
        darkMode: false,
      },
      labels: {
        data: labels,
      },
      sessions,
    }

    jest
      .spyOn(redux, 'useSelector')
      .mockImplementation((callback) => callback(store))

    return store
  }

  beforeEach(() => {
    mount = createMount()
    jest.clearAllMocks()
  })

  afterEach(() => {
    mount.cleanUp()
  })

  test('should render <LabelsChart /> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })

  test('should render <Doughnut /> correctly', () => {
    createStore()
    expect(createWrapper().find(Doughnut).exists()).toBe(true)
  })

  test('there should be labels.length + 1 labels', () => {
    createStore()

    expect(createWrapper().find(Doughnut).prop('data').labels.length).toBe(
      labels.length + 1
    )
  })

  test('should open menu on button click', () => {
    createStore()
    const wrapper = createWrapper()

    wrapper.find(IconButton).simulate('click')
    expect(wrapper.find(Menu).prop('open')).toBe(true)
  })
})
