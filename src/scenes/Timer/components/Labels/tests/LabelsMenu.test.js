import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import labels from '../../../../../data/labels/tests/mock-data/labels'
import { LabelsMenu, LabelMenuItem } from '../LabelsMenu'

describe('<LabelsMenu />', () => {
  const mockStore = configureMockStore([thunk])

  let store
  let mount
  let wrapper

  beforeEach(() => {
    mount = createMount()

    wrapper = (labelSelected = null) => {
      const storeData = {
        labels: {
          labelSelected,
          data: labels,
          menuOpened: true,
        },
      }

      store = mockStore(storeData)
      store.dispatch = jest.fn()

      return mount(
        <Provider store={store}>
          <LabelsMenu anchor={document.createElement('div')} />
        </Provider>
      )
    }
  })

  afterEach(() => {
    mount.cleanUp()
  })

  test('should render <LabelsMenu /> correctly', () => {
    expect(wrapper()).toMatchSnapshot()
  })

  test('only third menu item should be selected', () => {
    const wrapperRendered = wrapper(labels[2])

    expect(
      wrapperRendered.find(LabelMenuItem).at(0).prop('selected')
    ).toBeFalsy()

    expect(
      wrapperRendered.find(LabelMenuItem).at(1).prop('selected')
    ).toBeFalsy()

    expect(
      wrapperRendered.find(LabelMenuItem).at(2).prop('selected')
    ).toBeTruthy()
  })
})
