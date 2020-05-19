import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMount } from '@material-ui/core/test-utils'
import { DeleteAlert } from '../DeleteAlert'
import labels from './fixtures/labels'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import fs from '../../../../../firebase/firebase'

describe('<DeleteAlert />', () => {
  const mockStore = configureMockStore([thunk])

  const uid = 'asdf1111'
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

    wrapper = (opened = false) => {
      storeData = {
        auth: { uid },
        labels: { deleteAlert: opened, labelEditting: labels[0] },
      }

      store = mockStore(storeData)
      store.dispatch = jest.fn()

      return mount(
        <Provider store={store}>
          <DeleteAlert />
        </Provider>
      )
    }
  })

  afterEach(() => {
    mount.cleanUp()
  })

  test('should render <DeleteAlert /> correctly', () => {
    expect(wrapper()).toMatchSnapshot()
  })

  test('alert should be closed initially', () => {
    expect(wrapper().find(Dialog).prop('open')).toBe(false)
  })

  test('alert should be opened ', () => {
    expect(wrapper(true).find(Dialog).prop('open')).toBe(true)
  })

  test('should call dispatch 5 times on delete button click ', () => {
    wrapper(true).find(Button).at(1).simulate('click')
    expect(store.dispatch).toHaveBeenCalledTimes(5)
  })
})
