import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useStyles from './style'
import ApplicationBar from '../../components/ApplicationBar'
import useApplicationBarController from '../../components/ApplicationBar/hook'
import { useHistory } from 'react-router-dom'
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, Typography
} from '@material-ui/core'
import useMountModel from '../../models/mount'
import { formatFstabOption } from '../../utils/string'
import { ArrowDownward, ArrowUpward, KeyboardArrowDown, KeyboardArrowUp, ListAlt } from '@material-ui/icons'
import { Mount } from '../../api/mount'
import MountRow from './row'

interface FstabPagePropsType {

}

const FstabPage = ({}: FstabPagePropsType) => {
  const classes = useStyles()
  const controller = useApplicationBarController()
  const history = useHistory()
  const mountModel = useMountModel()

  useEffect(() => {
    mountModel.loadMounts()
  }, [])

  return (
    <div className={classes.main}>
      <ApplicationBar controller={controller} title={'Fstab'} onBack={() => history.goBack()} className={classes.appbar} />
      <div className={classes.content}>
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Drive</TableCell>
                <TableCell>Dir</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mountModel.mountList.map((mount) => (<
                MountRow
                mount={mount}
                key={mount.file}
                onRemove={(mount) => mountModel.removeMount(mount.file)}
              />))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}
export default FstabPage