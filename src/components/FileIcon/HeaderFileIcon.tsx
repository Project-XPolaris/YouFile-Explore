import React from 'react'

export const HeaderFileIcon = ({ className }: { className?: string }): React.ReactElement => {
  return (
    <svg viewBox='0 0 49.77 59.72' className={className}>
      <path
        d='M3,0A2.84,2.84,0,0,0,.89.9,3.14,3.14,0,0,0,0,3V56.74a2.86,2.86,0,0,0,.9,2.09A2.91,2.91,0,0,0,3,59.72h43.8a2.86,2.86,0,0,0,2.09-.89,3,3,0,0,0,.89-2.09V16.92L32.84,0Z'
        transform='translate(0.01)' fill='#4cb6e0' />
      <path d='M49.76,16.92H35.83a3.06,3.06,0,0,1-3-3V0Z' transform='translate(0.01)' fill='#fff' opacity='0.5' />
      <path
        d='M22.07,30.46A4.91,4.91,0,0,1,26,28.58q4.82,0,4.88,5.59v9.47H27V34.28a2.71,2.71,0,0,0-.55-1.88,2.32,2.32,0,0,0-1.82-.61,2.68,2.68,0,0,0-2.51,1.34V43.64H18.12v-21h3.95Z'
        transform='translate(0.01)' fill='#fff' />
    </svg>
  )
}
