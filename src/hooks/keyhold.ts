import { useState } from 'react'
import { useKeyPress } from 'ahooks'

export const useKeyHold = (key:string) => {
  const [isHold, setIsHold] = useState<boolean>(false)
  useKeyPress(key, () => {
    if (!isHold) {
      setIsHold(true)
    }
  }, {
    events: ['keydown']
  })
  useKeyPress(key, () => {
    if (isHold) {
      setIsHold(false)
    }
  }, {
    events: ['keyup']
  })
  return [isHold]
}
