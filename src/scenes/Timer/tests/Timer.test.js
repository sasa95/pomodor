import React from 'react'
import { createShallow } from '@material-ui/core/test-utils'
import { Timer } from '../Timer'

describe('<SkipButton />', () => {
  const shallow = createShallow()
  const wrapper = shallow(<Timer />)

  test('should render <Timer /> correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
