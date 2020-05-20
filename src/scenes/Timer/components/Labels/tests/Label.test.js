import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import { Label, ColorIndicator, ActionButton } from '../Label'
import labels from '../../../../../data/labels/tests/mock-data/labels'

describe('<Label />', () => {
  const mockStore = configureMockStore([thunk])

  let store
  let mount
  let wrapper

  beforeEach(() => {
    store = mockStore()
    store.dispatch = jest.fn()

    mount = createMount()

    wrapper = mount(
      <Provider store={store}>
        <Label label={labels[0]} />
      </Provider>
    )
  })

  afterEach(() => {
    mount.cleanUp()
  })

  test('should render <Label /> correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should display label name', () => {
    const { name } = labels[0]
    expect(wrapper.contains(name)).toBe(true)
  })

  test('should display color indicator with correct color', () => {
    const { color } = labels[0]
    expect(wrapper.find(ColorIndicator).prop('color')).toBe(color)
  })

  test('should call dispatch twice when delete button is clicked', () => {
    wrapper.find(ActionButton).at(1).simulate('click')
    expect(store.dispatch).toHaveBeenCalledTimes(2)
  })

  test('should call dispatch three times when edit button is clicked', () => {
    wrapper.find(ActionButton).at(0).simulate('click')
    expect(store.dispatch).toHaveBeenCalledTimes(3)
  })
})
