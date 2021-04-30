import React from 'react'

export const TorrentFileIcon = ({ className }:{className?:string}):React.ReactElement => {
  return (
    <svg version="1.1" width="24" height="24" viewBox="0 0 24 24" className={className}>
      <path fill="currentColor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
    </svg>
  )
}
