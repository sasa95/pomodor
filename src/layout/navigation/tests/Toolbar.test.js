import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import { Toolbar } from '../Toolbar'
import { UserAvatar } from '../UserAvatar'
import { SignIn } from '../SignIn'

const mockStore = configureMockStore([thunk])

describe('<Toolbar />', () => {
  let mount
  let wrapper
  const logoSelector = 'img[alt="Pomodor logo"]'
  const offlineIconSelector =
    'WithStyles(ForwardRef(SvgIcon))[data-role="offline-icon"]'

  beforeAll(() => {
    mount = createMount()

    wrapper = (name = null) => {
      const store = mockStore({ auth: { name } })

      return mount(
        <Provider store={store}>
          <Toolbar />
        </Provider>
      )
    }
  })

  test('should render <Toolbar /> correctly when the user is online', () => {
    expect(wrapper()).toMatchSnapshot()
  })

  test('should render <UserAvatar /> when the user is online and logged in', () => {
    jest.spyOn(navigator, 'onLine', 'get').mockReturnValue(true)

    expect(wrapper('Sasha').find(UserAvatar)).toHaveLength(1)
    expect(wrapper('Sasha').find(offlineIconSelector)).toHaveLength(0)
    expect(wrapper('Sasha').find(SignIn)).toHaveLength(0)
  })

  test('should render <SignIn /> when the user is online and not logged in', () => {
    jest.spyOn(navigator, 'onLine', 'get').mockReturnValue(true)

    expect(wrapper().find(SignIn)).toHaveLength(1)
    expect(wrapper().find(offlineIconSelector)).toHaveLength(0)
    expect(wrapper().find(UserAvatar)).toHaveLength(0)
  })

  test('should render <Toolbar /> correctly when the user is offline', () => {
    jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(false)

    expect(wrapper()).toMatchSnapshot()
  })

  test('should render offline icon when the user is offline', () => {
    jest.spyOn(navigator, 'onLine', 'get').mockReturnValue(false)

    expect(wrapper().find(offlineIconSelector)).toHaveLength(1)
    expect(wrapper().find(UserAvatar)).toHaveLength(0)
    expect(wrapper().find(SignIn)).toHaveLength(0)
  })

  test('should render Pomodor logo', () => {
    expect(wrapper().find(logoSelector)).toHaveLength(1)
  })
})
