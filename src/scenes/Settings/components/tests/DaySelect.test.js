import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import Select from '@material-ui/core/Select'
import { DaySelect } from '../DaySelect'
import { startSetFirstDayOfTheWeek } from '../../../../data/settings/actions'

describe('<DaySelect />', () => {
  const mockStore = configureMockStore([thunk])

  let store
  let mount
  let wrapper

  beforeEach(() => {
    store = mockStore({ settings: { firstDayOfTheWeek: 'Monday' } })
    store.dispatch = jest.fn()
    mount = createMount()

    wrapper = mount(
      <Provider store={store}>
        <DaySelect />
      </Provider>
    )
  })

  test('should render <DaySelect /> correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should dispatch action when onChange event is triggered', () => {
    wrapper.find(Select).prop('onChange')({ target: { value: 'Sunday' } })

    expect(store.dispatch).toHaveBeenCalled()
  })
})
