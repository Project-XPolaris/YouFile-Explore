import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'transparent',
    },
    paper: {
      backgroundColor: 'transparent !important',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      '&::-webkit-scrollbar': {
        width: 8
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.6)'
      },
    },
    header: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(2),
      zIndex: 2,
      marginTop: theme.spacing(2)
    },
    title: {
      ...theme.typography.subtitle2,
      color: 'white'
    },
    main: {
      paddingTop: theme.spacing(8)
    },
    content: {
      width: theme.spacing(40),
      backgroundColor: 'transparent',
      '&::-webkit-scrollbar': {
        width: '0 !important'
      }
    },
    item: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    empty: {
      width: '100%',
      height: '80vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyHint: {
      ...theme.typography.body1,
      color: '#FFFFFF'
    },
    modal:{
      backgroundColor: 'rgba(0,0,0,.3)',
      backdropFilter: 'blur(5px)'
    }
  })
)

export default useStyles
