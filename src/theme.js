import { createMuiTheme } from '@material-ui/core/styles'
import indigo from '@material-ui/core/colors/indigo'
import pink from '@material-ui/core/colors/pink'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: pink[300],
    },
  },
})

export default theme
