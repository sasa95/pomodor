import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createShallow } from '@material-ui/core/test-utils'
import { Page404 } from '../Page404'

describe('<Page404 />', () => {
  let shallow

  beforeAll(() => {
    shallow = createShallow({ untilSelector: Page404 })
  })

  test('should render Page 404 correctly', () => {
    const wrapper = shallow(
      <BrowserRouter>
        <Page404 />
      </BrowserRouter>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
