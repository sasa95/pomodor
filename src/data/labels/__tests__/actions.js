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
} from '../actions'

const labels = [
  {
    id: '1',
    color: '#f00',
    name: 'Coding',
  },
  {
    id: '2',
    color: '#0f0',
    name: 'Reading',
  },
  {
    id: '3',
    color: '#00f',
    name: 'Playing a guitar',
  },
]

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

test('should generate action object for deleteLabel', () => {
  const id = labels[1].id
  const action = deleteLabel(id)

  expect(action).toEqual({
    type: 'DELETE_LABEL',
    id,
  })
})

test('should generate action object for setLabels', () => {
  const action = setLabels(labels)

  expect(action).toEqual({
    type: 'SET_LABELS',
    labels,
  })
})
