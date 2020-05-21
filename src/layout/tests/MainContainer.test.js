import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import labels from '../../data/labels/tests/mock-data/labels'
import { initialState as initialSettings } from '../../data/settings/reducer'
import { initialState as initialTimer } from '../../scenes/Timer/data/timer/reducer'
import { initialState as initialLabels } from '../../data/labels/reducer'
import { MainContainer } from '../MainContainer'

jest.mock('react-chartjs-2', () => ({
  Doughnut: () => null,
}))

describe('<MainContainer />', () => {
  const mockStore = configureMockStore([thunk])
  let store
  let mount
  let wrapper

  beforeEach(() => {
    mount = createMount()

    store = mockStore({
      settings: initialSettings,
      timer: initialTimer,
      auth: { name: 'Alex', photo: 'https://via.placeholder.com/100' },
      labels: {
        ...initialLabels,
        data: labels,
      },
    })
    store.dispatch = jest.fn()

    Element.prototype.scrollTo = () => {}

    wrapper = mount(
      <Provider store={store}>
        <BrowserRouter keyLength={0}>
          <MainContainer />
        </BrowserRouter>
      </Provider>
    )
  })

  afterEach(() => {
    mount.cleanUp()
  })

  test('should render <MainContainer /> correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
