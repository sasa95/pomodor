import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import TextField from '@material-ui/core/TextField'
import labels from '../../../../../data/labels/tests/mock-data/labels'
import { LabelForm, ColorTextField } from '../LabelForm'
import * as labelsActions from '../../../../../data/labels/actions'

describe('<LabelForm />', () => {
  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(<LabelForm />)
  }

  const dispatchMocked = jest.fn()
  jest.spyOn(redux, 'useDispatch').mockImplementation(() => dispatchMocked)

  const createStore = (labelEditting = null) => {
    const store = {
      labels: { labelEditting },
      settings: { darkMode: false },
    }

    jest
      .spyOn(redux, 'useSelector')
      .mockImplementation((callback) => callback(store))

    return store
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render <LabelForm /> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })

  test('should display error message if name field is invalid', () => {
    const labelEditting = labels[0]
    createStore(labelEditting)

    const wrapper = createWrapper()

    wrapper
      .find(TextField)
      .at(0)
      .simulate('change', { target: { value: '' } })

    expect(wrapper.find(TextField).at(0).prop('error')).toBe(true)
  })

  test('should call setFormValue and should not display error message if name field is valid', () => {
    const setFormValueMocked = jest
      .spyOn(labelsActions, 'setFormValue')
      .mockImplementation(() => jest.fn())

    const labelEditting = labels[0]
    createStore(labelEditting)

    const wrapper = createWrapper()

    wrapper
      .find(TextField)
      .at(0)
      .simulate('change', { target: { value: `${labelEditting.name} -` } })

    expect(wrapper.find(TextField).at(0).prop('error')).toBe(false)

    expect(setFormValueMocked).toHaveBeenCalledWith({
      name: `${labelEditting.name} -`,
      color: labelEditting.color,
    })
  })

  test('should display error message on blur if name field is empty', () => {
    createStore()

    const wrapper = createWrapper()

    wrapper
      .find(TextField)
      .at(0)
      .simulate('blur', { target: { value: '' } })

    expect(wrapper.find(TextField).at(0).prop('error')).toBe(true)
  })

  test('should call setFormValue on color value change', () => {
    const setFormValueMocked = jest
      .spyOn(labelsActions, 'setFormValue')
      .mockImplementation(() => jest.fn())

    const labelEditting = labels[0]
    createStore(labelEditting)

    const wrapper = createWrapper()

    wrapper.find(ColorTextField).prop('onChange')({
      target: { value: '#ffeb3b' },
    })

    expect(setFormValueMocked).toHaveBeenCalledWith({
      name: labelEditting.name,
      color: '#ffeb3b',
    })
  })
})
