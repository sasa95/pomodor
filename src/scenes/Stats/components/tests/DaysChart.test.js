import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import Menu from '@material-ui/core/Menu'
import IconButton from '@material-ui/core/IconButton'
import { Doughnut } from 'react-chartjs-2'
import { DaysChart } from '../DaysChart'
import sessions from '../../../../data/sessions/tests/mock-data/sessions'

jest.mock('react-chartjs-2', () => ({
  Doughnut: () => null,
}))

describe('<DaysChart />', () => {
  const mockStore = configureMockStore([thunk])
  let store
  let mount
  let wrapper

  beforeEach(() => {
    store = mockStore({
      settings: {
        firstDayOfTheWeek: 'Monday',
      },
      sessions,
    })

    store.dispatch = jest.fn()
    mount = createMount()

    wrapper = mount(
      <Provider store={store}>
        <DaysChart />
      </Provider>
    )
  })

  afterEach(() => {
    mount.cleanUp()
  })

  test('should render <DaysChart /> correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should render <Doughnut /> correctly', () => {
    expect(wrapper.find(Doughnut).exists()).toBe(true)
  })

  test('there should be 7 chart labels', () => {
    expect(wrapper.find(Doughnut).prop('data').labels.length).toBe(7)
  })

  test('should open menu on button click', () => {
    wrapper.find(IconButton).simulate('click')
    expect(wrapper.find(Menu).prop('open')).toBe(true)
  })
})
