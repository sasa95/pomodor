import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import Chip from '@material-ui/core/Chip'
import { Overview, Sum, Avg } from '../Overview'
import sessions from '../../../../data/sessions/tests/mock-data/sessions'

describe('<Overview />', () => {
  const mockStore = configureMockStore([thunk])
  const sumTimeRegex = /^(\d+h\s\d+m)|-$/
  const avgTimeRegex = /^(\d+h\s\d+m\savg)|-$/
  const sumCountRegex = /^(\d+(\.\d)?)|-$/
  const avgCountRegex = /^(\d+(\.\d)?\savg)|-$/

  let store
  let mount
  let wrapper

  beforeEach(() => {
    store = mockStore({
      auth: {
        uid: 's3sns123',
        creationTime: new Date('05/01/2020'),
        name: null,
        photo: null,
      },
      settings: {
        firstDayOfTheWeek: 'Monday',
      },
      sessions,
    })

    store.dispatch = jest.fn()
    mount = createMount()

    wrapper = mount(
      <Provider store={store}>
        <Overview />
      </Provider>
    )
  })

  afterEach(() => {
    mount.cleanUp()
  })

  test('should render <Overview /> correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should render total/average time in [NUMh MINm]/[NUMh MINm avg] format by default', () => {
    const sums = wrapper.find(Sum)

    sums.forEach((sum) => {
      expect(sum.text()).toMatch(sumTimeRegex)
    })

    const avgs = wrapper.find(Avg)

    avgs.forEach((avg) => {
      expect(avg.text()).toMatch(avgTimeRegex)
    })
  })

  test('should render total/average time in [NUMh MINm]/[NUMh MINm avg] format by on time button click', () => {
    wrapper.find(Chip).at(1).simulate('click')
    wrapper.find(Chip).at(0).simulate('click')

    const sums = wrapper.find(Sum)

    sums.forEach((sum) => {
      expect(sum.text()).toMatch(sumTimeRegex)
    })

    const avgs = wrapper.find(Avg)

    avgs.forEach((avg) => {
      expect(avg.text()).toMatch(avgTimeRegex)
    })
  })

  test('should render total/average sessions count in [NUM]/[NUM avg] format by on sessions button click', () => {
    wrapper.find(Chip).at(1).simulate('click')

    const sums = wrapper.find(Sum)

    sums.forEach((sum) => {
      expect(sum.text()).toMatch(sumCountRegex)
    })

    const avgs = wrapper.find(Avg)

    avgs.forEach((avg) => {
      expect(avg.text()).toMatch(avgCountRegex)
    })
  })
})
