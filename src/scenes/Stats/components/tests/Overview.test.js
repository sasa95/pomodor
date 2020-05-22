import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import Chip from '@material-ui/core/Chip'
import { Overview, Sum, Avg } from '../Overview'
import sessions from '../../../../data/sessions/tests/mock-data/sessions'

describe('<Overview />', () => {
  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(<Overview />)
  }

  const dispatchMocked = jest.fn()
  jest.spyOn(redux, 'useDispatch').mockImplementation(() => dispatchMocked)

  const createStore = () => {
    const store = {
      auth: {
        uid: 's3sns123',
        creationTime: new Date('05/01/2020'),
      },
      settings: {
        firstDayOfTheWeek: 'Monday',
      },
      sessions,
    }

    jest
      .spyOn(redux, 'useSelector')
      .mockImplementation((callback) => callback(store))

    return store
  }

  const sumTimeRegex = /^(\d+h\s\d+m)|-$/
  const avgTimeRegex = /^(\d+h\s\d+m\savg)|-$/
  const sumCountRegex = /^(\d+(\.\d)?)|-$/
  const avgCountRegex = /^(\d+(\.\d)?\savg)|-$/

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render <Overview /> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })

  test('should render total/average time in [NUMh MINm]/[NUMh MINm avg] format by default', () => {
    createStore()
    const wrapper = createWrapper()

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
    createStore()
    const wrapper = createWrapper()

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
    createStore()
    const wrapper = createWrapper()

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
