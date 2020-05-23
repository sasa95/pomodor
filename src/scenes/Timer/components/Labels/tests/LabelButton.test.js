import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import labels from '../../../../../data/labels/tests/mock-data/labels'
import { LabelButton, Button } from '../LabelButton'
import { STATUSES } from '../../../data/timer/reducer'
import * as labelsActions from '../../../../../data/labels/actions'

describe('<LabelButton />', () => {
  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(<LabelButton />)
  }

  const dispatchMocked = jest.fn()
  jest.spyOn(redux, 'useDispatch').mockImplementation(() => dispatchMocked)

  const createStore = (
    labelsData = [],
    labelSelected = null,
    timerStatus = STATUSES.onHold
  ) => {
    const store = {
      labels: {
        data: labelsData,
        labelSelected,
        menuOpened: false,
      },
      timer: {
        status: timerStatus,
      },
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

  test('should render <LabelButton /> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })

  test('button should be enabled if timer status is ON_HOLD', () => {
    createStore()
    expect(createWrapper().find(Button).prop('disabled')).toBe(false)
  })

  test('button should be disabled if timer status is not ON_HOLD', () => {
    createStore([], null, STATUSES.running)
    expect(createWrapper().find(Button).prop('disabled')).toBe(true)
  })

  test('button should have text ADD LABEL if there are no labels created', () => {
    createStore()
    expect(createWrapper().find(Button).text().toUpperCase()).toBe('ADD LABEL')
  })

  test('button should have text SELECT LABEL if there are some labels created', () => {
    createStore(labels)
    expect(createWrapper().find(Button).text().toUpperCase()).toBe(
      'SELECT LABEL'
    )
  })

  test('button should display the text of the selected label if a label is selected', () => {
    createStore(labels, labels[0])
    expect(createWrapper().find(Button).text()).toBe(labels[0].name)
  })

  test('should display dialog on button click if there are no labels created', () => {
    const setFullscreenDialogMocked = jest
      .spyOn(labelsActions, 'setFullscreenDialog')
      .mockImplementation(() => jest.fn())

    createStore()

    createWrapper().find(Button).simulate('click')
    expect(setFullscreenDialogMocked).toHaveBeenCalledWith(true)
  })

  test('should open menu on button click if there are some labels created', () => {
    const setMenuOpenedMocked = jest
      .spyOn(labelsActions, 'setMenuOpened')
      .mockImplementation(() => jest.fn())

    createStore(labels)

    createWrapper().find(Button).simulate('click')
    expect(setMenuOpenedMocked).toHaveBeenCalledWith(true)
  })
})
