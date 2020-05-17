import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import { NavList, NavListItem } from '../NavList'
import { STATUSES } from '../../../scenes/Timer/data/timer/reducer'

describe('<NavList />', () => {
  const mockStore = configureMockStore([thunk])

  let mount
  let wrapper

  beforeAll(() => {
    mount = createMount()

    wrapper = (status = STATUSES.onHold) => {
      const store = mockStore({ timer: { status } })

      return mount(
        <Provider store={store}>
          <BrowserRouter>
            <NavList />
          </BrowserRouter>
        </Provider>
      )
    }
  })

  test('should render <NavList/> correctly', () => {
    expect(wrapper()).toMatchSnapshot()
  })

  test('should render 3 Nav List Items', () => {
    expect(wrapper().find(NavListItem)).toHaveLength(3)
  })

  test('Second and third menu items should be disabled if the timer is running', () => {
    expect(
      wrapper(STATUSES.running).find(NavListItem).at(1).prop('disabled')
    ).toBeTruthy()

    expect(
      wrapper(STATUSES).find(NavListItem).at(2).prop('disabled')
    ).toBeTruthy()
  })
})
