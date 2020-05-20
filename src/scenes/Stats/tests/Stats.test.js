import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import { Stats } from '../Stats'
import sessions from '../../../data/sessions/tests/mock-data/sessions'
import labels from '../../../data/labels/tests/mock-data/labels'
import { BrowserRouter } from 'react-router-dom'
import { NoData } from '../components/NoData'

jest.mock('react-chartjs-2', () => ({
  Doughnut: () => null,
}))

describe('<Stats />', () => {
  const mockStore = configureMockStore([thunk])
  let store
  let mount
  let wrapper

  beforeEach(() => {
    mount = createMount()

    wrapper = (sessions = []) => {
      store = mockStore({
        auth: {
          uid: 's3sns123',
          creationTime: new Date('05/01/2020'),
          name: null,
          photo: null,
        },
        settings: {
          firstDayOfTheWeek: 'Monday',
        },
        labels: {
          data: labels,
        },
        sessions,
      })

      store.dispatch = jest.fn()

      return mount(
        <Provider store={store}>
          <BrowserRouter>
            <Stats />
          </BrowserRouter>
        </Provider>
      )
    }
  })

  afterEach(() => {
    mount.cleanUp()
  })

  test('should render <Stats /> correctly', () => {
    expect(wrapper()).toMatchSnapshot()
  })

  test('should render <NoData /> if no sessions are provided', () => {
    expect(wrapper().find(NoData).exists()).toBe(true)
  })

  test('should not render <NoData /> if the sessions are provided', () => {
    expect(wrapper(sessions).find(NoData).exists()).toBe(false)
  })
})
