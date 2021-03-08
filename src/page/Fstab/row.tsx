import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box, Button,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'
import { formatFstabOption } from '../../utils/string'
import { Mount } from '../../api/mount'

const useStyles = makeStyles(theme => ({
  main: {

  },
  actions: {
    display: 'flex',
    marginTop: theme.spacing(2)
  }
}))

interface MountRowPropsType {
  mount:Mount,
  onRemove:(mount:Mount) => void
}

const MountRow = ({ mount, onRemove }:MountRowPropsType):React.ReactElement => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  return (
    <React.Fragment key={mount.file}>
      <TableRow>
        <TableCell>
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell scope="row">{mount.spec}</TableCell>
        <TableCell>{mount.file}</TableCell>
        <TableCell>{mount.vfs_type}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detail
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Options</TableCell>
                    <TableCell>Dump</TableCell>
                    <TableCell>Fsck</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell scope="row">{formatFstabOption(mount.mnt_ops)}</TableCell>
                  <TableCell scope="row">{mount.freq}</TableCell>
                  <TableCell scope="row">{mount.pass_no}</TableCell>
                </TableBody>
              </Table>
              <div className={classes.actions}>
                <Button size="small" onClick={() => onRemove(mount)}>
                  Remove
                </Button>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default MountRow
