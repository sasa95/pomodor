import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
import { SaveSessionAlert } from '../SaveSessionAlert'
import * as timerActions from '../../data/timer/actions'
import * as sessionsActions from '../../../../data/sessions/actions'

describe('<SaveSessionAlert />', () => {
  const time = { minutes: 4, seconds: 11 }
  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(<SaveSessionAlert time={time} />)
  }

  const dispatchMocked = jest.fn()
  jest.spyOn(redux, 'useDispatch').mockImplementation(() => dispatchMocked)

  const createStore = () => {
    const store = {
      timer: { saveSessionAlert: true },
      labels: { labelSelected: null },
    }

    jest
      .spyOn(redux, 'useSelector')
      .mockImplementation((callback) => callback(store))

    return store
  }
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should render <SaveSessionAlert /> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })

  test('should render correct message', () => {
    expect(createWrapper().find(DialogContentText).text()).toBe(
      'Do you want to save 04:11 to the statistics?'
    )
  })

  test('should handle cancel button click', () => {
    const setSaveSessionAlertMocked = jest
      .spyOn(timerActions, 'setSaveSessionAlert')
      .mockImplementation(() => jest.fn())

    createStore()

    createWrapper().find(Button).at(0).simulate('click')
    expect(setSaveSessionAlertMocked).toHaveBeenCalledWith(false)
  })

  test('should call confirm button click', () => {
    const startAddSessionMocked = jest
      .spyOn(sessionsActions, 'startAddSession')
      .mockImplementation(() => jest.fn())

    createStore()

    createWrapper().find(Button).at(1).simulate('click')

    expect(startAddSessionMocked).toHaveBeenCalledWith({
      duration: time,
      label: null,
      createdAt: expect.any(Number),
    })
  })
})
