import { reducer, initialState } from '../reducer'
import labels from './mock-data/labels'

test('should setup default labels state', () => {
  const state = reducer(undefined, { type: '@@INIT' })
  expect(state).toEqual(initialState)
})

test('should set fullscreen dialog', () => {
  const fullscreenDialog = true
  const state = reducer(initialState, {
    type: 'SET_FULLSCREEN_DIALOG',
    fullscreenDialog,
  })
  expect(state.fullscreenDialog).toBe(fullscreenDialog)
})

test('should set desktop dialog', () => {
  const desktopDialog = true
  const state = reducer(initialState, {
    type: 'SET_DESKTOP_DIALOG',
    desktopDialog,
  })
  expect(state.desktopDialog).toBe(desktopDialog)
})

test('should set delete alert', () => {
  const deleteAlert = true
  const state = reducer(initialState, {
    type: 'SET_DELETE_ALERT',
    deleteAlert,
  })
  expect(state.deleteAlert).toBe(deleteAlert)
})

test('should set delete alert', () => {
  const menuOpened = true
  const state = reducer(initialState, {
    type: 'SET_MENU_OPENED',
    menuOpened,
  })
  expect(state.menuOpened).toBe(menuOpened)
})

test('should set label editting', () => {
  const labelEditting = labels[0]
  const state = reducer(initialState, {
    type: 'SET_LABEL_EDITTING',
    labelEditting,
  })
  expect(state.labelEditting).toEqual(labelEditting)
})

test('should set form value', () => {
  const formValue = {
    name: 'Paint',
    color: '#444',
  }

  const state = reducer(initialState, {
    type: 'SET_FORM_VALUE',
    formValue,
  })
  expect(state.formValue).toEqual(formValue)
})

test('should add label', () => {
  const label = {
    id: 100,
    name: 'Paint',
    color: '#111',
  }

  const currentState = {
    ...initialState,
    data: labels,
  }

  const state = reducer(currentState, {
    type: 'ADD_LABEL',
    label,
  })
  expect(state.data).toEqual([...labels, label])
})

test('should edit label', () => {
  const id = labels[1].id
  const updates = {
    name: 'Reading poetry',
    color: '#ff0',
  }

  const currentState = {
    ...initialState,
    data: labels,
    labelEditting: labels[1],
  }

  const state = reducer(currentState, {
    type: 'EDIT_LABEL',
    id,
    updates,
  })

  expect(state.data[1]).toEqual({
    ...updates,
    id,
  })
})

test('should delete label', () => {
  const id = labels[1].id

  const currentState = {
    ...initialState,
    data: labels,
  }

  const state = reducer(currentState, {
    type: 'DELETE_LABEL',
    id,
  })

  expect(state.data).toEqual([labels[0], labels[2]])
})

test('should set labels', () => {
  const currentState = { ...initialState }

  const state = reducer(currentState, {
    type: 'SET_LABELS',
    labels,
  })

  expect(state.data).toEqual(labels)
})

test('should set labels', () => {
  const labelSelected = labels[1]
  const currentState = { ...initialState }

  const state = reducer(currentState, {
    type: 'SET_LABEL_SELECTED',
    labelSelected,
  })

  expect(state.labelSelected).toEqual(labelSelected)
})
