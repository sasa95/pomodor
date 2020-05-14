import fs from '../../firebase/firebase'

export const setFullscreenDialog = (fullscreenDialog) => ({
  type: 'SET_FULLSCREEN_DIALOG',
  fullscreenDialog,
})

export const setDesktopDialog = (desktopDialog) => ({
  type: 'SET_DESKTOP_DIALOG',
  desktopDialog,
})

export const setDeleteAlert = (deleteAlert) => ({
  type: 'SET_DELETE_ALERT',
  deleteAlert,
})

export const setMenuOpened = (menuOpened) => ({
  type: 'SET_MENU_OPENED',
  menuOpened,
})

export const setFormValue = (formValue) => ({
  type: 'SET_FORM_VALUE',
  formValue,
})

export const setLabelEditting = (labelEditting) => ({
  type: 'SET_LABEL_EDITTING',
  labelEditting,
})

export const setLabelSelected = (labelSelected) => ({
  type: 'SET_LABEL_SELECTED',
  labelSelected,
})

export const addLabel = (label) => ({
  type: 'ADD_LABEL',
  label,
})

export const startAddLabel = (label) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    const newLabelRef = fs.collection(`users/${uid}/labels`).doc()

    dispatch(
      addLabel({
        id: newLabelRef.id,
        ...label,
      })
    )
    await newLabelRef.set({ ...label })
  }
}

export const editLabel = (id, updates) => ({
  type: 'EDIT_LABEL',
  id,
  updates,
})

export const startEditLabel = (id, updates) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    dispatch(editLabel(id, updates))

    await fs.doc(`users/${uid}/labels/${id}`).update({
      ...updates,
    })
  }
}

export const deleteLabel = (id) => ({
  type: 'DELETE_LABEL',
  id,
})

export const startDeleteLabel = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    dispatch(deleteLabel(id))

    await fs.doc(`users/${uid}/labels/${id}`).delete()
  }
}

export const setLabels = (labels) => ({
  type: 'SET_LABELS',
  labels,
})

export const startSetLabels = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    try {
      const labelsRef = await fs.collection(`users/${uid}/labels`).get()

      const labels = labelsRef.docs.map((label) => ({
        id: label.id,
        ...label.data(),
      }))

      dispatch(setLabels(labels))

      return labelsRef
    } catch (e) {
      dispatch(setLabels([]))
    }
  }
}
