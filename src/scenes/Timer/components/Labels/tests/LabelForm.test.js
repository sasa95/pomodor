import React from 'react'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import TextField from '@material-ui/core/TextField'
import labels from '../../../../../data/labels/tests/mock-data/labels'
import { LabelForm, ColorTextField } from '../LabelForm'

describe('<LabelForm />', () => {
  const mockStore = configureMockStore([thunk])

  let store
  let mount
  let wrapper

  beforeEach(() => {
    mount = createMount()

    wrapper = (labelEditting = null) => {
      const storeData = {
        labels: { labelEditting },
      }

      store = mockStore(storeData)
      store.dispatch = jest.fn()

      return mount(
        <Provider store={store}>
          <LabelForm />
        </Provider>
      )
    }
  })

  afterEach(() => {
    mount.cleanUp()
  })

  test('should render <LabelForm /> correctly', () => {
    expect(wrapper()).toMatchSnapshot()
  })

  test('should display error message if name field is invalid', () => {
    const wrapperRendered = wrapper(labels[0])

    wrapperRendered
      .find('input')
      .at(0)
      .simulate('change', { target: { value: '' } })

    expect(store.dispatch).toHaveBeenCalledTimes(1)
    expect(wrapperRendered.find(TextField).at(0).prop('error')).toBe(true)
  })

  test('should not display error message if name field is valid', () => {
    const wrapperRendered = wrapper(labels[0])

    wrapperRendered
      .find('input')
      .at(0)
      .simulate('change', { target: { value: `${labels[0].name} ` } })

    expect(store.dispatch).toHaveBeenCalledTimes(1)
    expect(wrapperRendered.find(TextField).at(0).prop('error')).toBe(false)
  })

  test('should display error message on blur if name field is empty', () => {
    const wrapperRendered = wrapper()

    wrapperRendered
      .find('input')
      .at(0)
      .simulate('blur', { target: { value: '' } })

    expect(wrapperRendered.find(TextField).at(0).prop('error')).toBe(true)
  })

  test('should call dispatch on color value change', () => {
    const wrapperRendered = wrapper(labels[0])

    act(() => {
      wrapperRendered.find(ColorTextField).prop('onChange')({
        target: { value: '#ffeb3b' },
      })
    })

    expect(store.dispatch).toHaveBeenCalledTimes(1)
  })
})
