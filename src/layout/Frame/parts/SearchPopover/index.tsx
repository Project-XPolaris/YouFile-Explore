import React, { useState } from 'react'
import { Card, IconButton, InputBase } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import useStyles from './style'

export interface SearchPopoverPropsType {
  onSearch: (key:string) => void
}
const SearchPopover = ({ onSearch }: SearchPopoverPropsType): React.ReactElement => {
  const classes = useStyles()
  const [input, setInput] = useState<string | undefined>()
  return (
    <Card elevation={0} className={classes.main}>
      <InputBase
        className={classes.input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={'Search for ...'}
      />
      <IconButton onClick={() => {
        if (input) {
          onSearch(input)
        }
      }}>
        <Search />
      </IconButton>
    </Card>
  )
}

export default SearchPopover
