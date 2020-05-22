import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import { DeleteAlert } from '../DeleteAlert'
import labels from '../../../../../data/labels/tests/mock-data/labels'
import * as labelsActions from '../../../../../data/labels/actions'

describe('<DeleteAlert />', () => {
  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(<DeleteAlert />)
  }

  const dispatchMocked = jest.fn()
  jest.spyOn(redux, 'useDispatch').mockImplementation(() => dispatchMocked)

  const createStore = (deleteAlert = false, labelEditting = null) => {
    const store = {
      labels: {
        deleteAlert,
        labelEditting,
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

  test('should render <DeleteAlert /> correctly', () => {
    createStore(true)
    expect(createWrapper()).toMatchSnapshot()
  })

  test('alert should be closed initially', () => {
    createStore(false)
    expect(createWrapper().find(Dialog).prop('open')).toBe(false)
  })

  test('alert should be opened ', () => {
    createStore(true)
    expect(createWrapper().find(Dialog).prop('open')).toBe(true)
  })

  test('should close alert on close button click ', () => {
    const setDeleteAlertMocked = jest
      .spyOn(labelsActions, 'setDeleteAlert')
      .mockImplementation(() => jest.fn())

    createStore(true)

    const wrapper = createWrapper()
    wrapper.find(Button).at(0).simulate('click')

    expect(setDeleteAlertMocked).toHaveBeenCalledWith(false)
  })

  test('should call startDeleteLabel on delete button click ', () => {
    const labelEdditing = labels[0]

    const startDeleteLabelMocked = jest
      .spyOn(labelsActions, 'startDeleteLabel')
      .mockImplementation(() => jest.fn())

    createStore(true, labelEdditing)

    createWrapper().find(Button).at(1).simulate('click')
    expect(startDeleteLabelMocked).toHaveBeenCalledWith(labelEdditing.id)
  })
})
