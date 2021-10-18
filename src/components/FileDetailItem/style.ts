import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.02)'
      }
    },
    valueField: {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      paddingLeft: 8,
      alignItems: 'center',
      display: 'flex'
    },
    value: {
      ...theme.typography.body1
    },
    icon: {
      width: 32,
      height: 32,
      padding: 8
    },
    selected: {
      backgroundColor: 'rgba(0,0,0,0.05)'
    }
  })
)

export default useStyles
