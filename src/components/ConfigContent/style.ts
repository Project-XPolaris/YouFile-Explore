import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    title: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(3)
    }
  })
)
export default useStyles
