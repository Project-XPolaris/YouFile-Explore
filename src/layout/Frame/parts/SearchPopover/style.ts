import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      width: theme.spacing(40),
      height: theme.spacing(8),
      display: 'flex',
      alignItems: 'center',
      paddingStart: theme.spacing(2),
      padEnd: theme.spacing(2),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    },
    input: {
      flexGrow: 1,
      marginRight: theme.spacing(2)
    },
    icon: {

    }
  })
)

export default useStyles
