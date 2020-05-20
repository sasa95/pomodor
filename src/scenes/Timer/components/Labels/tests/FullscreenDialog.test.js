import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import IconButton from '@material-ui/core/IconButton'
import labels from '../../../../../data/labels/tests/mock-data/labels'
import fs from '../../../../../firebase/firebase'
import { FullscreenDialog } from '../FullscreenDialog'

describe('<FullscreenDialog />', () => {
  const mockStore = configureMockStore([thunk])

  const uid = 'asdf3333'
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
          fullscreenDialog: true,
          labelEditting,
          formValue,
          data: labels,
          deleteAlert: false,
        },
      }

      store = mockStore(storeData)
      store.dispatch = jest.fn()

      return mount(
        <Provider store={store}>
          <FullscreenDialog />
        </Provider>
      )
    }
  })

  afterEach(() => {
    mount.cleanUp()
  })

  test('should render <FullscreenDialog /> correctly', () => {
    const wrapperRendered = wrapper()

    expect(wrapperRendered).toMatchSnapshot()
  })

  test('Should display 2 IconButton-s if there is no labelEditing data provided', () => {
    const wrapperRendered = wrapper(null, {
      name: 'Play Piano',
      color: '#123123',
    })

    expect(wrapperRendered.find(IconButton).length).toBe(2)
  })

  test('Should display 3 IconButton-s if there is labelEditing data provided', () => {
    const wrapperRendered = wrapper(labels[0], {
      name: 'Play Piano',
      color: '#123123',
    })

    expect(wrapperRendered.find(IconButton).length).toBe(3)
  })

  test('Confirm button should be disabled when incomplete data is provided', () => {
    const wrapperRendered = wrapper(null, {
      name: 'Play Piano',
    })

    expect(wrapperRendered.find(IconButton).at(1).prop('disabled')).toBe(true)
  })

  test('Confirm button should be enabled when complete data is provided and should call dispatch 4 times on confirm button click', () => {
    const wrapperRendered = wrapper(null, {
      name: 'Play Piano',
      color: '#123123',
    })

    expect(wrapperRendered.find(IconButton).at(1).prop('disabled')).toBe(false)
    wrapperRendered.find(IconButton).at(1).simulate('click')
    expect(store.dispatch).toHaveBeenCalledTimes(4)
  })

  test('Delete button should call dispatch once', () => {
    const wrapperRendered = wrapper(labels[0], {
      name: 'Play Piano',
      color: '#123123',
    })

    wrapperRendered.find(IconButton).at(1).simulate('click')
    expect(store.dispatch).toHaveBeenCalledTimes(1)
  })
})
