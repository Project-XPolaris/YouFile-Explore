import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    content: {
      display: 'flex',
      alignItems: 'center',
      margin: theme.spacing(2)
    },
    filename: {
      ...theme.typography.subtitle2,
      marginLeft: theme.spacing(2)
    },
    button: {
      marginTop: theme.spacing(1)
    },
    noContent: {
      ...theme.typography.subtitle1,
      color: '#bcbcbc',
      margin: theme.spacing(2)
    }
  })
)

export default useStyles
