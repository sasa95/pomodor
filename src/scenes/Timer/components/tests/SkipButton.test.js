import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import IconButton from '@material-ui/core/IconButton'
import { SkipButton } from '../SkipButton'

describe('<SkipButton />', () => {
  const mockStore = configureMockStore([thunk])

  let store
  let mount
  let wrapper

  beforeEach(() => {
    mount = createMount()

    const storeData = {
      timer: { timeLeft: { minutes: 25, seconds: 0 } },
      settings: {},
    }

    store = mockStore(storeData)
    store.dispatch = jest.fn()

    wrapper = mount(
      <Provider store={store}>
        <SkipButton />
      </Provider>
    )
  })

  afterEach(() => {
    mount.cleanUp()
  })

  test('should render <SkipButton /> correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should call dispatch once on button click', () => {
    wrapper.find(IconButton).simulate('click')
    expect(store.dispatch).toHaveBeenCalledTimes(1)
  })
})
