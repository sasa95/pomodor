import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import { Label, ColorIndicator, ActionButton } from '../Label'
import labels from '../../../../../data/labels/tests/mock-data/labels'
import * as labelsActions from '../../../../../data/labels/actions'
import * as materialColors from '@material-ui/core/colors'

describe('<Label />', () => {
  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(<Label label={labels[0]} />)
  }

  const dispatchMocked = jest.fn()
  jest.spyOn(redux, 'useDispatch').mockImplementation(() => dispatchMocked)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render <Label /> correctly', () => {
    expect(createWrapper()).toMatchSnapshot()
  })

  test('should display label name', () => {
    const { name } = labels[0]
    expect(createWrapper().contains(name)).toBe(true)
  })

  test('should display color indicator with correct color', () => {
    const { color } = labels[0]
    expect(createWrapper().find(ColorIndicator).prop('color')).toBe(
      materialColors[color][500]
    )
  })

  test('should handle edit button click', () => {
    const setFullscreenDialogMocked = jest
      .spyOn(labelsActions, 'setFullscreenDialog')
      .mockImplementation(() => jest.fn())

    createWrapper()
      .find(ActionButton)
      .at(0)
      .simulate('click', { stopPropagation: jest.fn() })
    expect(setFullscreenDialogMocked).toHaveBeenCalledWith(true)
  })

  test('should handle delete button click', () => {
    const setDeleteAlertMocked = jest
      .spyOn(labelsActions, 'setDeleteAlert')
      .mockImplementation(() => jest.fn())

    createWrapper()
      .find(ActionButton)
      .at(1)
      .simulate('click', { stopPropagation: jest.fn() })
    expect(setDeleteAlertMocked).toHaveBeenCalledWith(true)
  })
})
