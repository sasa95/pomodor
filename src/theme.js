import { createMuiTheme } from '@material-ui/core/styles'
import teal from '@material-ui/core/colors/teal'
import cyan from '@material-ui/core/colors/cyan'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: cyan[300],
    },
  },
})

export default theme
