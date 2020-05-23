import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import Button from '@material-ui/core/Button'
import { DesktopDialog } from '../DesktopDialog'
import labels from '../../../../../data/labels/tests/mock-data/labels'
import * as labelsActions from '../../../../../data/labels/actions'

describe('<DesktopDialog />', () => {
  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(<DesktopDialog />)
  }

  const dispatchMocked = jest.fn()
  jest.spyOn(redux, 'useDispatch').mockImplementation(() => dispatchMocked)

  const createStore = (
    labelEditting = null,
    formValue = { name: 'Play Piano', color: '#123123' }
  ) => {
    const store = {
      labels: {
        desktopDialog: true,
        labelEditting,
        formValue,
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

  test('should render <DesktopDialog /> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })

  test('Confirm button should be disabled when incomplete data is provided', () => {
    createStore(null, { name: 'Play Piano' })
    expect(createWrapper().find(Button).at(1).prop('disabled')).toBe(true)
  })

  test('Confirm button should be enabled when complete data is provided', () => {
    createStore()
    expect(createWrapper().find(Button).at(1).prop('disabled')).toBe(false)
  })

  test('should call startAddLabel with correct data on confirm button click', () => {
    const startAddLabelMocked = jest
      .spyOn(labelsActions, 'startAddLabel')
      .mockImplementation(() => jest.fn())

    const store = createStore()
    const wrapper = createWrapper()

    wrapper.find(Button).at(1).simulate('click')
    expect(startAddLabelMocked).toHaveBeenCalledWith(store.labels.formValue)
  })

  test('should call startEditLabel with correct data on confirm button click', () => {
    const startEditLabelMocked = jest
      .spyOn(labelsActions, 'startEditLabel')
      .mockImplementation(() => jest.fn())

    const labelEditting = labels[0]
    const store = createStore(labelEditting)

    const wrapper = createWrapper()
    wrapper.find(Button).at(1).simulate('click')

    expect(startEditLabelMocked).toHaveBeenCalledWith(
      labelEditting.id,
      store.labels.formValue
    )
  })

  test('should handle close button', () => {
    const setDesktopDialogMocked = jest
      .spyOn(labelsActions, 'setDesktopDialog')
      .mockImplementation(() => jest.fn())

    createStore()

    const wrapper = createWrapper()
    wrapper.find(Button).at(0).simulate('click')

    expect(setDesktopDialogMocked).toHaveBeenCalledWith(false)
  })
})
