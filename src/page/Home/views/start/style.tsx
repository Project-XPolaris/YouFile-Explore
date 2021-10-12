import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden',
      width: '100%'
    },
    itemContainer: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    item: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      justifyContent: 'center'
    },
    label: {
      ...theme.typography.h6,
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
      fontWeight: 300
    }
  })
)
export default useStyles
