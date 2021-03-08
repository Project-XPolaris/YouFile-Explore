import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  main: {
    backgroundColor: '#EEEEEE',
    height: 'calc(100vh - 32px)',
    overflowX: 'hidden',
    overflowY: 'auto',
    paddingTop: theme.spacing(9)
  },
  appbar: {
    marginTop: theme.spacing(4)
  },
  content: {
    padding: theme.spacing(2)
  },
  table: {
    minWidth: 650
  }
}))
export default useStyles
