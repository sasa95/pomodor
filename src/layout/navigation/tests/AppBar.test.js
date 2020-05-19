import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import { AppBar } from '../AppBar'
import { STATUSES } from '../../../scenes/Timer/data/timer/reducer'

describe('<AppBar />', () => {
  const mockStore = configureMockStore([thunk])
  const storedData = {
    settings: { darkMode: false },
    timer: { status: STATUSES.onHold },
    auth: { name: 'Sasha' },
  }

  let store
  let mount
  let wrapper

  beforeEach(() => {
    store = mockStore(storedData)

    mount = createMount({ dive: true })

    wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <AppBar />
        </BrowserRouter>
      </Provider>
    )
  })

  afterEach(() => {
    mount.cleanUp()
  })

  test('should render <AppBar /> correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
