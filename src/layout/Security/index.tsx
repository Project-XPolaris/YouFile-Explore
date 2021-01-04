import React from 'react'
import { useHistory } from 'react-router-dom'

export interface SecurityLayoutPropsType {

}

const SecurityLayout = ({}: SecurityLayoutPropsType) => {
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
