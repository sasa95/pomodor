import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import { Sliders } from '../Sliders'
import { Slider } from '../components/Slider'

describe('<Sliders />', () => {
  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(<Sliders />)
  }

  const createStore = () => {
    const store = {
      settings: {
        workDuration: 25,
        shortBreakDuration: 5,
        longBreakDuration: 20,
        rounds: 4,
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

  test('should render <Sliders /> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })

  test('should render 4 sliders', () => {
    createStore()
    expect(createWrapper().find(Slider).length).toBe(4)
  })
})
