import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import { RoundsCounter, CounterLabel } from '../RoundsCounter'

describe('<RoundsCounter />', () => {
  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(<RoundsCounter />)
  }

  const createStore = () => {
    const store = {
      timer: {
        currentRound: 3,
        timeLeft: { minutes: 25, seconds: 0 },
      },
      settings: { rounds: 4 },
    }

    jest
      .spyOn(redux, 'useSelector')
      .mockImplementation((callback) => callback(store))

    return store
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render <RoundsCounter /> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })

  test('should render current rounds/total rounds', () => {
    createStore()
    expect(createWrapper().find(CounterLabel).text()).toBe('3/4')
  })
})
