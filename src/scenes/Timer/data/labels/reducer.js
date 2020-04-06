const initialState = {
  dialogOpened: false,
  formDialogOpened: false,
  deleteAlert: {
    opened: false,
    labelToDelete: null,
  },
  labelToEdit: null,
  formValue: null,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DIALOG_OPENED':
      return {
        ...state,
        dialogOpened: action.dialogOpened,
      }
    case 'SET_FORM_DIALOG':
      return {
        ...state,
        formDialogOpened: action.formDialogOpened,
      }
    case 'SET_DELETE_ALERT':
      const { opened, labelToDelete } = action.deleteAlert

      return {
        ...state,
        deleteAlert: {
          opened,
          labelToDelete,
        },
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
