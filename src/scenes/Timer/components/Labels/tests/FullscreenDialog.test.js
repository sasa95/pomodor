import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import IconButton from '@material-ui/core/IconButton'
import labels from '../../../../../data/labels/tests/mock-data/labels'
import { FullscreenDialog } from '../FullscreenDialog'
import * as labelsActions from '../../../../../data/labels/actions'

describe('<FullscreenDialog />', () => {
  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(<FullscreenDialog />)
  }

  const dispatchMocked = jest.fn()
  jest.spyOn(redux, 'useDispatch').mockImplementation(() => dispatchMocked)

  const createStore = (labelEditting = null, formValue = null) => {
    const store = {
      labels: {
        fullscreenDialog: true,
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

  test('should render <FullscreenDialog /> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })

  test('Should display 2 IconButton-s in add mode', () => {
    createStore(null, {
      name: 'Play Piano',
      color: '#123123',
    })

    expect(createWrapper().find(IconButton).length).toBe(2)
  })

  test('Should display 3 IconButton-s in edit mode', () => {
    createStore(labels[0], {
      name: 'Play Piano',
      color: '#123123',
    })

    expect(createWrapper().find(IconButton).length).toBe(3)
  })

  test('Confirm button should be disabled when incomplete data is provided', () => {
    createStore(null, {
      name: 'Play Piano',
    })

    expect(createWrapper().find(IconButton).at(1).prop('disabled')).toBe(true)
  })

  test('should call startAddLabel in add mode on confirm button click', () => {
    const startAddLabelMocked = jest
      .spyOn(labelsActions, 'startAddLabel')
      .mockImplementation(() => jest.fn())

    const formValue = {
      name: 'Play Piano',
      color: '#123123',
    }

    createStore(null, formValue)

    const wrapper = createWrapper()
    expect(wrapper.find(IconButton).at(1).prop('disabled')).toBe(false)

    wrapper.find(IconButton).at(1).simulate('click')
    expect(startAddLabelMocked).toHaveBeenCalledWith(formValue)
  })

  test('should call startEditLabel in edit mode on confirm button click', () => {
    const startEditLabelMocked = jest
      .spyOn(labelsActions, 'startEditLabel')
      .mockImplementation(() => jest.fn())

    const labelEditting = labels[0]
    const formValue = {
      name: labelEditting.name,
      color: '#123123',
    }

    createStore(labelEditting, formValue)

    const wrapper = createWrapper()
    expect(wrapper.find(IconButton).at(2).prop('disabled')).toBe(false)

    wrapper.find(IconButton).at(2).simulate('click')

    expect(startEditLabelMocked).toHaveBeenCalledWith(
      labelEditting.id,
      formValue
    )
  })

  test('should call setDeleteAlert on confirm button click', () => {
    const setDeleteAlertMocked = jest
      .spyOn(labelsActions, 'setDeleteAlert')
      .mockImplementation(() => jest.fn())

    const labelEditting = labels[0]

    createStore(labelEditting, {
      name: labelEditting.name,
      color: labelEditting.color,
    })

    const wrapper = createWrapper()

    wrapper.find(IconButton).at(1).simulate('click')
    expect(setDeleteAlertMocked).toHaveBeenCalledWith(true)
  })

  test('should handle close dialog', () => {
    const setFullscreenDialogMocked = jest
      .spyOn(labelsActions, 'setFullscreenDialog')
      .mockImplementation(() => jest.fn())

    createStore()

    const wrapper = createWrapper()
    wrapper.find(IconButton).at(0).simulate('click')

    expect(setFullscreenDialogMocked).toHaveBeenCalledWith(false)
  })
})
