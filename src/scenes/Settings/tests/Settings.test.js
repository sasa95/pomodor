import React from 'react'
import { createShallow } from '@material-ui/core/test-utils'
import { Settings } from '../Settings'

describe('<Settings />', () => {
  const shallow = createShallow()
  const wrapper = shallow(<Settings />)

  test('should render <Settings /> correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
