import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import Select from '@material-ui/core/Select'
import { DaySelect } from '../DaySelect'
import * as settingsActions from '../../../../data/settings/actions'

describe('<DaySelect />', () => {
  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(<DaySelect />)
  }

  const dispatchMocked = jest.fn()
  jest.spyOn(redux, 'useDispatch').mockImplementation(() => dispatchMocked)

  const createStore = () => {
    const store = {
      settings: { firstDayOfTheWeek: 'Monday' },
    }

    jest
      .spyOn(redux, 'useSelector')
      .mockImplementation((callback) => callback(store))

    return store
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render <DaySelect /> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })

  test('should dispatch action when onChange event is triggered', () => {
    const startSetFirstDayOfTheWeekMocked = jest
      .spyOn(settingsActions, 'startSetFirstDayOfTheWeek')
      .mockImplementation(() => jest.fn())

    createStore()
    createWrapper().find(Select).prop('onChange')({
      target: { value: 'Sunday' },
    })

    expect(startSetFirstDayOfTheWeekMocked).toHaveBeenCalledWith('Sunday')
  })
})
