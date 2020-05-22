import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import IconButton from '@material-ui/core/IconButton'
import { SkipButton } from '../SkipButton'
import * as timerActions from '../../data/timer/actions'

describe('<SkipButton />', () => {
  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(<SkipButton />)
  }

  const dispatchMocked = jest.fn()
  jest.spyOn(redux, 'useDispatch').mockImplementation(() => dispatchMocked)

  const createStore = () => {
    const store = {
      timer: { timeLeft: { minutes: 25, seconds: 0 } },
      settings: {},
    }

    jest
      .spyOn(redux, 'useSelector')
      .mockImplementation((callback) => callback(store))

    return store
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render <SkipButton /> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })

  test('should handle skip button click', () => {
    const setNextTimerMocked = jest
      .spyOn(timerActions, 'setNextTimer')
      .mockImplementation(() => jest.fn())

    createStore()

    createWrapper().find(IconButton).simulate('click')
    expect(setNextTimerMocked).toHaveBeenCalled()
  })
})
