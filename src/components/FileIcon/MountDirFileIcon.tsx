import React from 'react'

export const MountFileIcon = ({ className }: { className?: string }): React.ReactElement => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56.77 45.41' className={className}>
      <path d='M51.09,5.68H25.55L19.87,0H5.68A5.69,5.69,0,0,0,0,5.68V17H56.77V11.35a5.69,5.69,0,0,0-5.68-5.67Z'
        fill='#f49c19' />
      <path
        d='M51.09,5.68H5.68A5.69,5.69,0,0,0,0,11.35V39.74a5.69,5.69,0,0,0,5.68,5.67H51.09a5.69,5.69,0,0,0,5.68-5.67V11.35a5.69,5.69,0,0,0-5.68-5.67Z'
        fill='#f5c432' />
      <path
        d='M35.41,20.71H30.87V23h4.54a3.41,3.41,0,0,1,0,6.81H30.87v2.27h4.54a5.68,5.68,0,0,0,0-11.35ZM28.6,29.79H24.06a3.41,3.41,0,1,1,0-6.81H28.6V20.71H24.06a5.68,5.68,0,1,0,0,11.35H28.6Zm-3.41-4.54h9.08v2.27H25.19Z'
        fill='#fff' />
    </svg>
  )
}
