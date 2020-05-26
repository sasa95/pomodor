import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  setFullscreenDialog,
  setDesktopDialog,
  setDeleteAlert,
  setMenuOpened,
  setFormValue,
  setLabelEditting,
  setLabelSelected,
  addLabel,
  editLabel,
  deleteLabel,
  setLabels,
  startAddLabel,
  startEditLabel,
  startDeleteLabel,
  startSetLabels,
} from '../actions'
import labels from './mock-data/labels'
import fs from '../../../firebase/firebase'

const uid = 'asdf1234'
const defaultAuthState = { auth: { uid } }
const createMockStore = configureMockStore([thunk])

jest.setTimeout(15000)

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
})

test('should generate action object for setFullscreenDialog', () => {
  const fullscreenDialog = true
  const action = setFullscreenDialog(fullscreenDialog)

  expect(action).toEqual({
    type: 'SET_FULLSCREEN_DIALOG',
    fullscreenDialog,
  })
})

test('should generate action object for setDesktopDialog', () => {
  const desktopDialog = true
  const action = setDesktopDialog(desktopDialog)

  expect(action).toEqual({
    type: 'SET_DESKTOP_DIALOG',
    desktopDialog,
  })
})

test('should generate action object for setDeleteAlert', () => {
  const deleteAlert = true
  const action = setDeleteAlert(deleteAlert)

  expect(action).toEqual({
    type: 'SET_DELETE_ALERT',
    deleteAlert,
  })
})

test('should generate action object for setMenuOpened', () => {
  const menuOpened = true
  const action = setMenuOpened(menuOpened)

  expect(action).toEqual({
    type: 'SET_MENU_OPENED',
    menuOpened,
  })
})

test('should generate action object for setFormValue', () => {
  const formValue = {
    name: 'Paint',
    color: '#444',
  }

  const action = setFormValue(formValue)

  expect(action).toEqual({
    type: 'SET_FORM_VALUE',
    formValue,
  })
})

test('should generate action object for setLabelEditting', () => {
  const labelEditting = labels[0]
  const action = setLabelEditting(labelEditting)

  expect(action).toEqual({
    type: 'SET_LABEL_EDITTING',
    labelEditting,
  })
})

test('should generate action object for setLabelSelected', () => {
  const labelSelected = labels[1]
  const action = setLabelSelected(labelSelected)

  expect(action).toEqual({
    type: 'SET_LABEL_SELECTED',
    labelSelected,
  })
})

test('should generate action object for addLabel', () => {
  const label = {
    id: 100,
    name: 'Paint',
    color: '#111',
  }

  const action = addLabel(label)

  expect(action).toEqual({
    type: 'ADD_LABEL',
    label,
  })
})

test('should add label to database and store', async (done) => {
  const store = createMockStore(defaultAuthState)
  const labelData = {
    name: 'Coding',
    color: '#f00',
  }

  await store.dispatch(startAddLabel(labelData))

  const actions = store.getActions()

  expect(actions[0]).toEqual({
    type: 'ADD_LABEL',
    label: {
      id: expect.any(String),
      ...labelData,
    },
  })

  const label = await fs.doc(`users/${uid}/labels/${actions[0].label.id}`).get()

  expect({
    ...label.data(),
  }).toEqual({
    color: actions[0].label.color,
    name: actions[0].label.name,
  })

  done()
})

test('should generate action object for editLabel', () => {
  const id = labels[1].id
  const updates = {
    name: 'Reading poetry',
    color: '#ff0',
  }

  const action = editLabel(id, updates)

  expect(action).toEqual({
    type: 'EDIT_LABEL',
    id,
    updates,
  })
})

test('should update label in store and database', async (done) => {
  const store = createMockStore(defaultAuthState)
  const id = labels[1].id
  const updates = {
    name: 'Reading poetry',
    color: '#ff0',
  }
  await store.dispatch(startEditLabel(id, updates))

  const actions = store.getActions()

  expect(actions[0]).toEqual({
    type: 'EDIT_LABEL',
    id,
    updates,
  })

  const label = await fs.doc(`users/${uid}/labels/${id}`).get()

  expect({
    id: label.id,
    ...label.data(),
  }).toEqual({
    id,
    ...updates,
  })

  done()
})

test('should generate action object for deleteLabel', () => {
  const id = labels[1].id
  const action = deleteLabel(id)

  expect(action).toEqual({
    type: 'DELETE_LABEL',
    id,
  })
})

test('should delete label from database', async (done) => {
  const store = createMockStore(defaultAuthState)
  const id = labels[0].id

  await store.dispatch(startDeleteLabel(id))

  const actions = store.getActions()

  expect(actions[0]).toEqual({
    type: 'DELETE_LABEL',
    id,
  })

  const doc = await fs.doc(`users/${uid}/labels/${id}`).get()

  expect(doc.exists).toBe(false)

  done()
})

test('should generate action object for setLabels', () => {
  const action = setLabels(labels)

  expect(action).toEqual({
    type: 'SET_LABELS',
    labels,
  })
})

test('should fetch the labels from database', async (done) => {
  const store = createMockStore(defaultAuthState)

  await store.dispatch(startSetLabels())

  const actions = store.getActions()

  expect(actions[0]).toEqual({
    type: 'SET_LABELS',
    labels,
  })

  done()
})
