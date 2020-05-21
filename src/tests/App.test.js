import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import App from '../App'

jest.spyOn(redux, 'useDispatch').mockImplementation(() => null)

describe('<App />', () => {
  let wrapper
  let shallow

  beforeEach(() => {
    shallow = createShallow()
    wrapper = shallow(<App />)
  })

  test('should render <App /> correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
