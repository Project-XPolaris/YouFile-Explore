import React from 'react'

export const CSSFileIcon = ({ className }:{className?:string}):React.ReactElement => {
  return (
    <svg version="1.1" width="24" height="24" viewBox="0 0 24 24" className={className}>
      <path fill="currentColor" d="M5,3L4.35,6.34H17.94L17.5,8.5H3.92L3.26,11.83H16.85L16.09,15.64L10.61,17.45L5.86,15.64L6.19,14H2.85L2.06,18L9.91,21L18.96,18L20.16,11.97L20.4,10.76L21.94,3H5Z" />
    </svg>
  )
}
