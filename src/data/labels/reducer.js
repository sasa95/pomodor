const initialState = {
  dialogOpened: false,
  labelToEdit: null,
  formValue: {
    name: null,
    color: null,
  },
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DIALOG_OPENED':
      return {
        ...state,
        dialogOpened: action.dialogOpened,
      }
    case 'SET_LABEL_TO_EDIT':
      return {
        ...state,
        labelToEdit: action.labelToEdit,
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
