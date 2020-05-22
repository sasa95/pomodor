import React from 'react'
import { createShallow } from '@material-ui/core/test-utils'
import { NoData } from '../NoData'

describe('<NoData />', () => {
  const shallow = createShallow()
  const wrapper = shallow(<NoData />)

  test('should render <NoData /> correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
