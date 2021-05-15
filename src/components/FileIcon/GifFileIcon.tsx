import React from 'react';

export const GifFileIcon = ({ className }: { className?: string }): React.ReactElement => {
  return (
    <svg viewBox='0 0 49.77 59.72' className={className}>
      <path
        d='M3,0A2.84,2.84,0,0,0,.89.9,3.14,3.14,0,0,0,0,3V56.74a2.86,2.86,0,0,0,.9,2.09A2.91,2.91,0,0,0,3,59.72h43.8a2.86,2.86,0,0,0,2.09-.89,3,3,0,0,0,.89-2.09V16.92L32.84,0Z'
        transform='translate(0.01)' fill='#60bd94' />
      <path d='M49.76,16.92H35.83a3.06,3.06,0,0,1-3-3V0Z' transform='translate(0.01)' fill='#bbe0cf' />
      <path d='M24.43,38.07a8.46,8.46,0,1,0,8.46-8.46,8.47,8.47,0,0,0-8.46,8.46Z' transform='translate(0.01)'
            fill='#9bd2ba' />
      <path d='M16.46,35.09a8.47,8.47,0,1,0,8.47-8.46,8.47,8.47,0,0,0-8.47,8.46Z' transform='translate(0.01)'
            fill='#cce7db' />
      <path d='M8.5,31.6A8.46,8.46,0,1,0,17,23.14,8.45,8.45,0,0,0,8.5,31.6Z' transform='translate(0.01)' fill='#fff' />
    </svg>
  );
};
