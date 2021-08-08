import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor:"#efefef"
    },
    header:{
      ...theme.typography.h6,
      padding: theme.spacing(2),
      backgroundColor:"#FFFFFF"
    }
  }),
);
export default useStyles;
