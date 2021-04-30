import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'

const SecurityLayout = ():ReactElement => {
  const history = useHistory()
  if (localStorage.getItem('ServiceUrl') === null) {
    history.replace('/login')
  }
  return (
    <div>

    </div>
  )
}

export default SecurityLayout
