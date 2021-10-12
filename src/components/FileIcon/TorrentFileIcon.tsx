import React from 'react'

export const TorrentFileIcon = ({ className }: { className?: string }): React.ReactElement => {
  return (
    <svg viewBox='0 0 52.85 62.85' className={className}>

      <path d='M3,0A3.09,3.09,0,0,0,0,3V56.74a3.06,3.06,0,0,0,3,3c57.35-3.08,45.69,15.84,46.78-42.8L32.84,0Z'
        transform='translate(0.01 0)' fill='#5f308d' />
      <path d='M49.76,16.92C29.83,16.85,32.94,19.86,32.84,0Z' transform='translate(0.01 0)' fill='#fff'
        opacity='0.5' />
      <path
        d='M36.63,40.9c-18.15,20-37.93-17.43-9.79-21.09v2.47c-11.72-.46-16.13,17-4.88,21-12.29-6.82-2.45-24.68,9.19-19.46-.35.74-.66,1.46-1,2.12C16.46,22.18,15.05,42.8,28.25,42.57,11.47,40,23,17.1,33.73,30.29c-.75.4-1.41.74-2.07,1.06C22.89,22.12,13.07,41.85,36.6,41c0-.08,0-.06,0-.06Z'
        transform='translate(0.01 0)' fill='#fff' />
    </svg>
  )
}
