import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import Chip from '@material-ui/core/Chip'
import { Overview } from '../Overview'
import sessions from '../../../../data/sessions/tests/mock-data/sessions'
import { OverviewSubcard } from '../components/OverviewSubcard'

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
  const sumCountRegex = /^(\d+(\.\d)?)|-$/

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render <Overview /> correctly', () => {
    createStore()
    expect(createWrapper()).toMatchSnapshot()
  })

  test('should render total time in [NUMh MINm]/[NUMh MINm avg] format by default', () => {
    createStore()
    const wrapper = createWrapper()

    const subcards = wrapper.find(OverviewSubcard)

    subcards.forEach((card) => {
      expect(card.prop('sum')).toMatch(sumTimeRegex)
    })
  })

  test('should render total time in [NUMh MINm]/[NUMh MINm avg] format on time button click', () => {
    createStore()
    const wrapper = createWrapper()

    wrapper.find(Chip).at(1).simulate('click')
    wrapper.find(Chip).at(0).simulate('click')

    const subcards = wrapper.find(OverviewSubcard)

    subcards.forEach((card) => {
      expect(card.prop('sum')).toMatch(sumTimeRegex)
    })
  })

  test('should render total sessions count in [NUM]/[NUM avg] format on sessions button click', () => {
    createStore()
    const wrapper = createWrapper()

    wrapper.find(Chip).at(1).simulate('click')

    const subcards = wrapper.find(OverviewSubcard)

    subcards.forEach((card) => {
      expect(card.prop('sum')).toMatch(sumCountRegex)
    })
  })
})
