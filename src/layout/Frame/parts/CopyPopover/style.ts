import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    content: {
    },
    filename: {
      ...theme.typography.subtitle2,
      marginLeft: theme.spacing(2)
    },
    container: {
      height: theme.spacing(30),
      width: theme.spacing(40)
    },
    primaryText: {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    },
    button: {
      marginTop: theme.spacing(1)
    },
    header: {
      padding: theme.spacing(2),
      display: 'flex',
      alignItems: 'center'
    },
    headerText: {
      ...theme.typography.h6,
      flexGrow: 1
    },
    noContent: {
      ...theme.typography.subtitle1,
      color: '#bcbcbc',
      margin: theme.spacing(2)
    }
  })
)

export default useStyles
