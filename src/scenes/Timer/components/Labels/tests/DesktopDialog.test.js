import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import Button from '@material-ui/core/Button'
import labels from '../../../../../data/labels/tests/mock-data/labels'
import fs from '../../../../../firebase/firebase'
import { DesktopDialog } from '../DesktopDialog'

describe('<DesktopDialog />', () => {
  const mockStore = configureMockStore([thunk])

  const uid = 'asdf2222'
  let store
  let storeData
  let mount
  let wrapper

  beforeEach(async (done) => {
    const batch = fs.batch()

    const labelsRef = await fs.collection(`users/${uid}/labels`).get()

    labelsRef.docs.forEach(({ id }) => {
      batch.delete(fs.doc(`users/${uid}/labels/${id}`))
    })

    labels.forEach(({ id, name, color }) => {
      const ref = fs.collection(`users/${uid}/labels`).doc(id)
      batch.set(ref, { name, color })
    })

    await batch.commit()
    done()

    mount = createMount()

    wrapper = (labelEditting = null, formValue = null) => {
      storeData = {
        auth: { uid },
        labels: {
          desktopDialog: true,
          labelEditting,
          formValue,
          data: labels,
        },
      }

      store = mockStore(storeData)
      store.dispatch = jest.fn()

      return mount(
        <Provider store={store}>
          <DesktopDialog />
        </Provider>
      )
    }
  })

  afterEach(() => {
    mount.cleanUp()
  })

  test('should render <DesktopDialog /> correctly', () => {
    const wrapperRendered = wrapper(null, {
      name: 'Play Piano',
      color: '#123123',
    })

    expect(wrapperRendered).toMatchSnapshot()
  })

  test('Confirm button should be disable when incomplete data is provided', () => {
    const wrapperRendered = wrapper(null, {
      name: 'Play Piano',
    })

    expect(wrapperRendered.find(Button).at(1).prop('disabled')).toBe(true)
  })

  test('Confirm button should be enabled when complete data is provided and should call dispatch 4 times on confirm button click', () => {
    const wrapperRendered = wrapper(null, {
      name: 'Play Piano',
      color: '#123123',
    })

    expect(wrapperRendered.find(Button).at(1).prop('disabled')).toBe(false)
    wrapperRendered.find(Button).at(1).simulate('click')
    expect(store.dispatch).toHaveBeenCalledTimes(4)
  })
})
