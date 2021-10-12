import React from 'react'

export const MarkdownFileIcon = ({ className }: { className?: string }): React.ReactElement => {
  return (
    <svg viewBox='0 0 49.77 59.72' className={className}>

      <path
        d='M3,0A2.84,2.84,0,0,0,.89.9,3.14,3.14,0,0,0,0,3V56.74a2.86,2.86,0,0,0,.9,2.09A2.91,2.91,0,0,0,3,59.72h43.8a2.86,2.86,0,0,0,2.09-.89,3,3,0,0,0,.89-2.09V16.92L32.84,0Z'
        transform='translate(0.01)' fill='#040000' />
      <path d='M49.76,16.92H35.83a3.06,3.06,0,0,1-3-3V0Z' transform='translate(0.01)' fill='#fff' opacity='0.5' />
      <path
        d='M12.42,41.23V29.39h3l4.44,4.44,4.44-4.44h3V41.23h-3V33.58L19.82,38l-4.44-4.44v7.65h-3M33.14,29.39h4.44v5.92h3.7L35.36,42l-5.92-6.66h3.7Z'
        transform='translate(0.01)' fill='#fff' />
    </svg>
  )
}
