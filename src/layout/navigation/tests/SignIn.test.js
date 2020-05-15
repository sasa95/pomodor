import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import { SignIn } from '../SignIn'

const mockStore = configureMockStore([thunk])

describe('<SignIn />', () => {
  let store
  let mount
  let wrapper
  const menuSelector = 'WithStyles(ForwardRef(Menu))'
  const buttonSelector = 'Styled(WithStyles(ForwardRef(Button)))'

  beforeAll(() => {
    store = mockStore({ auth: { uid: null } })

    mount = createMount()

    wrapper = mount(
      <Provider store={store}>
        <SignIn />
      </Provider>
    )
  })

  test('should render <SignIn /> correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('menu should be closed initially', () => {
    expect(wrapper.find(menuSelector).props().open).toBe(false)
  })

  test('should open menu on avatar click', () => {
    wrapper.find(buttonSelector).simulate('click')
    expect(wrapper.find(menuSelector).props().open).toBe(true)
  })
})
