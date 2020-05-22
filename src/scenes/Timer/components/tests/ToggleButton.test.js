import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import { ToggleButton } from '../ToggleButton'
import { STATUSES, TYPES } from '../../data/timer/reducer'

describe('<ToggleButton />', () => {
  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(<ToggleButton />)
  }

  const dispatchMocked = jest.fn()
  jest.spyOn(redux, 'useDispatch').mockImplementation(() => dispatchMocked)

  const createStore = (status = STATUSES.onHold) => {
    const store = {
      timer: {
        status,
        type: TYPES.work,
        timeLeft: { minutes: 25, seconds: 0 },
      },
      settings: {},
      labels: { labelSelected: null },
    }

    jest
      .spyOn(redux, 'useSelector')
      .mockImplementation((callback) => callback(store))

    return store
  }

  const buttonSelector = 'Styled(WithStyles(ForwardRef(IconButton)))'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render <ToggleButton /> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })

  test('should render Pause button if the timer is running', () => {
    createStore(STATUSES.running)
    expect(createWrapper().find(buttonSelector).prop('aria-label')).toBe(
      'pause timer'
    )
  })

  test('should render Start button if the timer not running', () => {
    createStore()
    expect(createWrapper().find(buttonSelector).prop('aria-label')).toBe(
      'start timer'
    )
  })
})
