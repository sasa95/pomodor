import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import { Sliders } from '../Sliders'
import { Slider } from '../components/Slider'

describe('<Sliders />', () => {
  const mockStore = configureMockStore([thunk])
  const storeData = {
    settings: {
      workDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 20,
      rounds: 4,
    },
  }

  let store
  let mount
  let wrapper

  beforeEach(() => {
    store = mockStore(storeData)
    mount = createMount()

    wrapper = mount(
      <Provider store={store}>
        <Sliders />
      </Provider>
    )
  })

  afterEach(() => {
    mount.cleanUp()
  })

  test('should render <Sliders /> correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should render 4 sliders', () => {
    expect(wrapper.find(Slider).length).toBe(4)
  })
})
