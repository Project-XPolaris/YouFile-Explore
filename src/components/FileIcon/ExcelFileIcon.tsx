import React from 'react'

export const ExcelFileIcon = ({ className }: { className?: string }): React.ReactElement => {
  return (
    <svg viewBox='0 0 49.77 59.72' className={className}>
      <path
        d='M3,0A2.84,2.84,0,0,0,.89.9,3.14,3.14,0,0,0,0,3V56.74a2.86,2.86,0,0,0,.9,2.09A2.91,2.91,0,0,0,3,59.72h43.8a2.86,2.86,0,0,0,2.09-.89,3,3,0,0,0,.89-2.09V16.92L32.84,0Z'
        transform='translate(0.01)' fill='#046c38' />
      <path d='M49.76,16.92H35.83a3.06,3.06,0,0,1-3-3V0Z' transform='translate(0.01)' fill='#fff' opacity='0.5' />
      <path d='M22.4,34.15,15.05,23.89h5.08l4.8,7.34,5-7.34h4.91L27.36,34.15l7.89,10.91H30.12l-5.29-7.78-5.29,7.83h-5Z'
        transform='translate(0.01)' fill='#fff' />
    </svg>
  )
}
