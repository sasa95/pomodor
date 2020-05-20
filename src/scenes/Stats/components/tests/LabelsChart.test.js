import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
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

describe('<Overview />', () => {
  const mockStore = configureMockStore([thunk])
  let store
  let mount
  let wrapper

  beforeEach(() => {
    store = mockStore({
      settings: {
        firstDayOfTheWeek: 'Monday',
      },
      labels: {
        data: labels,
      },
      sessions,
    })

    store.dispatch = jest.fn()
    mount = createMount()

    wrapper = mount(
      <Provider store={store}>
        <LabelsChart />
      </Provider>
    )
  })

  afterEach(() => {
    mount.cleanUp()
  })

  test('should render <LabelsChart /> correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should render <Doughnut /> correctly', () => {
    expect(wrapper.find(Doughnut).exists()).toBe(true)
  })

  test('there should be labels.length + 1 labels', () => {
    expect(wrapper.find(Doughnut).prop('data').labels.length).toBe(
      labels.length + 1
    )
  })

  test('should open menu on button click', () => {
    wrapper.find(IconButton).simulate('click')
    expect(wrapper.find(Menu).prop('open')).toBe(true)
  })
})
