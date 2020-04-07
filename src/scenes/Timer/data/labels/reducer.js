const initialState = {
  fullscreenDialog: false,
  desktopDialog: false,
  deleteAlert: false,
  labelEditting: null,
  formValue: null,
  data: [],
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FULLSCREEN_DIALOG':
      return {
        ...state,
        fullscreenDialog: action.fullscreenDialog,
      }
    case 'SET_DESKTOP_DIALOG':
      return {
        ...state,
        desktopDialog: action.desktopDialog,
      }
    case 'SET_DELETE_ALERT':
      return {
        ...state,
        deleteAlert: action.deleteAlert,
      }
    case 'SET_LABEL_EDITTING':
      return {
        ...state,
        labelEditting: action.labelEditting,
      }
    case 'SET_FORM_VALUE':
      return {
        ...state,
        formValue: action.formValue,
      }
    case 'ADD_LABEL':
      return {
        ...state,
        data: [...state.data, action.label],
      }
    case 'EDIT_LABEL':
      const updatedLabels = state.data.map((label) => {
        if (label.id === action.id) {
          return {
            ...label,
            ...action.updates,
          }
        } else {
          return label
        }
      })
      return { ...state, data: updatedLabels }
    case 'DELETE_LABEL':
      return {
        ...state,
        data: state.data.filter(({ id }) => id !== action.id),
      }
    case 'SET_LABELS':
      return {
        ...state,
        data: action.labels,
      }
    default:
      return state
  }
}
