import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    input: {
      marginBottom: theme.spacing(2),
      width: theme.spacing(40)
    }
  })
)
export default useStyles
