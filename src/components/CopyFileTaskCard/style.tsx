import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import theme from '../../theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      width: '100%',
      borderRadius: theme.spacing(1),
      // height: theme.spacing(25),
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column'
    },
    avatar: {
      backgroundColor: theme.palette.primary.dark
    },
    icon: {
      color: theme.palette.primary.contrastText
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    titleWrap: {
      flex: 1
    },
    title: {
      ...theme.typography.subtitle1,
      marginLeft: theme.spacing(2),
      fontSize: 14
    },
    subtitle: {
      ...theme.typography.subtitle2,
      marginLeft: theme.spacing(2)
    },
    content: {
      marginTop: theme.spacing(2),
      width: '100%',
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    info: {
      flex: 1
    },
    text: {
      ...theme.typography.body1,
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    },
    field: {
      display: 'flex'
    },
    label: {
      ...theme.typography.body2,
      width: theme.spacing(12)
    },
    text2: {
      ...theme.typography.body2,
      fontSize: 12
    }
  }),
);
export default useStyles;
