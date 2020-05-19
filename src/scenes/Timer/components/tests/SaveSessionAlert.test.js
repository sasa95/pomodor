import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
import { SaveSessionAlert } from '../SaveSessionAlert'

describe('<ResetButton />', () => {
  const mockStore = configureMockStore([thunk])

  let store
  let mount
  let wrapper

  beforeEach(() => {
    mount = createMount()

    const storeData = {
      timer: { saveSessionAlert: true },
      labels: { labelSelected: null },
    }

    store = mockStore(storeData)
    store.dispatch = jest.fn()

    wrapper = mount(
      <Provider store={store}>
        <SaveSessionAlert time={{ minutes: 4, seconds: 11 }} />
      </Provider>
    )
  })

  test('should render <SaveSessionAlert /> correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should render correct message', () => {
    expect(wrapper.find(DialogContentText).text()).toBe(
      'Do you want to save 04:11 to the statistics?'
    )
  })

  test('should call dispatch once on cancel button click', () => {
    wrapper.find(Button).at(0).simulate('click')
    expect(store.dispatch).toHaveBeenCalledTimes(1)
  })

  test('should call dispatch twice on confirm button click', () => {
    wrapper.find(Button).at(1).simulate('click')
    expect(store.dispatch).toHaveBeenCalledTimes(2)
  })
})
