import { makeStyles } from '@material-ui/core/styles';
import theme from '../../../../theme';

const useStyles = makeStyles({
  main: {
    width: '100%',
    backgroundColor: '#EEEEEE',
    display: 'flex'
  },
  fileContent: {
    width: '100%',
    flex: '1 1'
  },
  container: {
    backgroundColor: '#EEEEEE',
    width: '100%',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto'
  },
  side: {
    backgroundColor: 'white',
    height: '100%',
    width: 240,
    overflowY: 'auto'
  },
  createDirectory: {
    width: theme.spacing(40)
  },
  bottomInfo:{
    width: "100%",
    height: theme.spacing(3),
    backgroundColor: '#CCCCCC',
    display: 'flex',
    alignItems: 'center',
    paddingLeft:theme.spacing(2),
    overflow: 'hidden'
  },
  fileName:{
    ...theme.typography.body2
  }
})
export default useStyles
