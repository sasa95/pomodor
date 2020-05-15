import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import { NavList } from '../NavList'
import { STATUSES } from '../../../scenes/Timer/data/timer/reducer'
import { BrowserRouter } from 'react-router-dom'

const mockStore = configureMockStore([thunk])

describe('<NavList />', () => {
  let mount
  let wrapper
  const itemsSelector = 'Styled(WithStyles(ForwardRef(ListItem)))'

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

  test('should container 3 Nav List Items', () => {
    expect(wrapper().find(itemsSelector)).toHaveLength(3)
  })

  test('Second and third menu items should be disabled if the timer is running', () => {
    expect(
      wrapper(STATUSES.running).find(itemsSelector).at(1).prop('disabled')
    ).toBeTruthy()

    expect(
      wrapper(STATUSES).find(itemsSelector).at(2).prop('disabled')
    ).toBeTruthy()
  })
})
