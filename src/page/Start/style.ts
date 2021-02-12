import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    header: {
      marginTop: theme.spacing(15)
    },
    title: {
      color: theme.palette.primary.contrastText
    },
    content: {
      height: '100vh',
      width: '100vw',
      display: 'flex',
      paddingTop: theme.spacing(4)
    },
    side: {
      width: theme.spacing(35),
      height: '100%',
      borderRight: '1px solid #eeeeee'
    },
    main: {
      position: 'relative',
      flex: 1,
      height: '100%',
      backgroundColor: '#EEEEEE',
      padding: theme.spacing(2),
      overflowY: 'auto',
      overflowX: 'hidden'
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    },
    fabIcon:{
      marginRight: theme.spacing(2)
    }
  })
)
export default useStyles
