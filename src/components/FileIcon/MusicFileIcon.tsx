import React from 'react'

export const MusicFileIcon = ({ className }: { className?: any }): React.ReactElement => {
  return (
    <svg version='1.1' width='24' height='24' viewBox='0 0 24 24' className={className}>
      <path fill='currentColor'
        d='M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17S7.79 21 10 21 14 19.21 14 17V7H18V3H12Z' />
    </svg>
  )
}
