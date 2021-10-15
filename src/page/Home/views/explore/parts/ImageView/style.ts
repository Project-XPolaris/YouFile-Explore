import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '50vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,.8)',
      height: '100%'
    },
    image: {
      maxWidth: '40vw',
      maxHeight: '40vh',
      boxShadow: '-4px 4px 41px rgba(0, 0, 0, 0.2)'
    }
  })
)

export default useStyles
