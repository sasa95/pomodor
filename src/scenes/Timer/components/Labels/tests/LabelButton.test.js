import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import labels from './fixtures/labels'
import { LabelButton, Button } from '../LabelButton'
import { STATUSES } from '../../../data/timer/reducer'

describe('<LabelButton />', () => {
  const mockStore = configureMockStore([thunk])

  let store
  let mount
  let wrapper

  beforeEach(() => {
    mount = createMount()

    wrapper = (
      labelsData = [],
      labelSelected = null,
      timerStatus = STATUSES.onHold
    ) => {
      const storeData = {
        labels: { data: labelsData, labelSelected },
        timer: { status: timerStatus },
      }

      store = mockStore(storeData)
      store.dispatch = jest.fn()

      return mount(
        <Provider store={store}>
          <LabelButton />
        </Provider>
      )
    }
  })

  test('should render <LabelButton /> correctly', () => {
    expect(wrapper()).toMatchSnapshot()
  })

  test('button should be enabled if timer status is ON_HOLD', () => {
    expect(wrapper().find(Button).prop('disabled')).toBe(false)
  })

  test('button should be disabled if timer status is not ON_HOLD', () => {
    expect(
      wrapper([], null, STATUSES.running).find(Button).prop('disabled')
    ).toBe(true)
  })

  test('button should have text ADD LABEL if there are no labels created', () => {
    expect(wrapper().find(Button).text().toUpperCase()).toBe('ADD LABEL')
  })

  test('button should have text SELECT LABEL if there are some labels created', () => {
    expect(wrapper(labels).find(Button).text().toUpperCase()).toBe(
      'SELECT LABEL'
    )
  })

  test('button should display the text of the selected label if a label is selected', () => {
    expect(wrapper(labels, labels[0]).find(Button).text()).toBe(labels[0].name)
  })

  test('should call dispatch once on button click if there are no labels created', () => {
    wrapper().find(Button).simulate('click')
    expect(store.dispatch).toHaveBeenCalledTimes(1)
  })

  test('should call dispatch once on button click if there are some labels created', () => {
    wrapper(labels).find(Button).simulate('click')
    expect(store.dispatch).toHaveBeenCalledTimes(1)
  })
})
