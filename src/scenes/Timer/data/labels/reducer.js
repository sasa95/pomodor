const initialState = {
  fullscreenDialog: false,
  desktopDialog: false,
  deleteAlert: false,
  labelEditting: null,
  formValue: null,
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
    default:
      return state
  }
}
