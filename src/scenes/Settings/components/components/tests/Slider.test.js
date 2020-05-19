import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import { Slider, SettingSlider } from '../Slider'

describe('<Slider />', () => {
  const mockStore = configureMockStore([thunk])
  const startSetWorkDuration = jest.fn()

  const props = {
    name: 'Work duration',
    marks: [
      {
        value: 5,
        label: '5 min',
      },
      {
        value: 25,
        label: '25 min',
      },
      {
        value: 60,
        label: '60 min',
      },
    ],
    step: 5,
    min: 5,
    max: 60,
    unit: 'minutes',
    action: startSetWorkDuration,
    value: 25,
  }

  let store
  let mount
  let wrapper

  beforeEach(() => {
    store = mockStore({ settings: { darkMode: true } })
    store.dispatch = jest.fn()
    mount = createMount()

    wrapper = mount(
      <Provider store={store}>
        <Slider {...props} />
      </Provider>
    )
  })

  afterEach(() => {
    mount.cleanUp()
  })

  test('should render <Slider /> correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should call passed action with the right data when onChangeCommitted is triggered', () => {
    const duration = 30
    wrapper.find(SettingSlider).prop('onChangeCommitted')({}, duration)
    expect(startSetWorkDuration).toHaveBeenCalledWith(duration)
  })
})
