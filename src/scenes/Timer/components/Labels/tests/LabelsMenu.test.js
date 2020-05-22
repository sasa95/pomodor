import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import MenuItem from '@material-ui/core/MenuItem'
import labels from '../../../../../data/labels/tests/mock-data/labels'
import { LabelsMenu, LabelMenuItem } from '../LabelsMenu'
import * as labelsActions from '../../../../../data/labels/actions'

describe('<LabelsMenu />', () => {
  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(<LabelsMenu anchor={document.createElement('div')} />)
  }

  const dispatchMocked = jest.fn()
  jest.spyOn(redux, 'useDispatch').mockImplementation(() => dispatchMocked)

  const createStore = (labelSelected = null) => {
    const store = {
      labels: {
        labelSelected,
        data: labels,
        menuOpened: true,
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

  test('should render <LabelsMenu /> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })

  test('only third menu item should be selected', () => {
    createStore(labels[2])
    const wrapper = createWrapper()

    expect(wrapper.find(LabelMenuItem).at(0).prop('selected')).toBe(false)

    expect(wrapper.find(LabelMenuItem).at(1).prop('selected')).toBe(false)

    expect(wrapper.find(LabelMenuItem).at(2).prop('selected')).toBe(true)
  })

  test('should render correct number of menu items', () => {
    createStore()
    expect(createWrapper().find(LabelMenuItem).length).toBe(labels.length)
  })

  test('should handle add button', () => {
    const setFullscreenDialogMocked = jest
      .spyOn(labelsActions, 'setFullscreenDialog')
      .mockImplementation(() => jest.fn())

    createStore()
    createWrapper()
      .find(MenuItem)
      .simulate('click', { stopPropagation: jest.fn() })
    expect(setFullscreenDialogMocked).toHaveBeenCalledWith(true)
  })
})
