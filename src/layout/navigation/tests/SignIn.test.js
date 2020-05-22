import React from 'react'
import * as redux from 'react-redux'
import { createShallow } from '@material-ui/core/test-utils'
import Menu from '@material-ui/core/Menu'
import { SignIn, TriggerButton } from '../SignIn'

describe('<SignIn />', () => {
  const shallow = createShallow()
  const createWrapper = () => {
    return shallow(<SignIn />)
  }

  const dispatchMocked = jest.fn()
  jest.spyOn(redux, 'useDispatch').mockImplementation(() => dispatchMocked)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render <SignIn /> correctly', () => {
    expect(createWrapper()).toMatchSnapshot()
  })

  test('menu should be closed initially', () => {
    expect(createWrapper().find(Menu).props().open).toBe(false)
  })

  test('should open menu on avatar click', () => {
    const wrapper = createWrapper()

    wrapper.find(TriggerButton).simulate('click', { currentTarget: {} })
    expect(wrapper.find(Menu).props().open).toBe(true)
  })
})
