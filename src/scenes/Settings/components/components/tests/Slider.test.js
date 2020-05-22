import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import { Slider, SettingSlider } from '../Slider'

describe('<Slider />', () => {
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
    action: jest.fn(),
    value: 25,
  }

  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(<Slider {...props} />)
  }

  const dispatchMocked = jest.fn()
  jest.spyOn(redux, 'useDispatch').mockImplementation(() => dispatchMocked)

  const createStore = () => {
    const store = {
      settings: {
        darkMode: false,
      },
    }

    jest
      .spyOn(redux, 'useSelector')
      .mockImplementation((callback) => callback(store))

    return store
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render <Slider /> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })

  test('should call passed action with the right data when onChangeCommitted is triggered', () => {
    createStore()
    const duration = 30
    createWrapper().find(SettingSlider).prop('onChangeCommitted')({}, duration)

    expect(props.action).toHaveBeenCalledWith(duration)
  })
})
