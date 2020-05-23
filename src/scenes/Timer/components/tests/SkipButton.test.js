import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import Button from '@material-ui/core/Button'
import { SkipButton, ActionButton } from '../SkipButton'
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

  test.only('should render <SkipButton /> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })

  test('should handle skip button click', () => {
    const setNextTimerMocked = jest
      .spyOn(timerActions, 'setNextTimer')
      .mockImplementation(() => jest.fn())

    createStore()

    createWrapper().find(Button).simulate('click')
    expect(setNextTimerMocked).toHaveBeenCalled()
  })
})
