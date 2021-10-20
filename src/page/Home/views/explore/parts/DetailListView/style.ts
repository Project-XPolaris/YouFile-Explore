import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: '#fcfcfc',
    display: 'flex',
    flexDirection: 'column'
  },
  item: {

  },
  dataField: {
    paddingLeft: 8
  },

  header: {
    ...theme.typography.caption,
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    backgroundColor: 'rgb(0,0,0,.0.05)'
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
  },
  nameField: {
    display: 'flex',
    alignItems: 'center'
  },
  row: {
    outline: 'none',
    display: 'flex',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.02)'
    }
  },
  dragHandle: {
    zIndex: 2,
    cursor: 'col-resize'
  },
  dragHandleIcon: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }

}))
export default useStyles
