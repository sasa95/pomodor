import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import { AppBar } from '../AppBar'
import { STATUSES } from '../../../scenes/Timer/data/timer/reducer'
import { BrowserRouter } from 'react-router-dom'

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

  beforeAll(() => {
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

  test('should render <AppBar /> correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
