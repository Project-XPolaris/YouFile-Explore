import React from 'react';

export const CmdFileIcon = ({ className }: { className?: string }): React.ReactElement => {
  return (
    <svg viewBox='0 0 49.77 59.72' className={className}>
      <path
        d='M3,0A2.84,2.84,0,0,0,.89.9,3.14,3.14,0,0,0,0,3V56.74a2.86,2.86,0,0,0,.9,2.09A2.91,2.91,0,0,0,3,59.72h43.8a2.86,2.86,0,0,0,2.09-.89,3,3,0,0,0,.89-2.09V16.92L32.84,0Z'
        transform='translate(0.01)' fill='#0c0c0c' />
      <path d='M49.76,16.92H35.83a3.06,3.06,0,0,1-3-3V0Z' transform='translate(0.01)' fill='#fff' opacity='0.5' />
      <path
        d='M20,31.12l-1.25,1.25,2.9,2.9-2.88,2.89L20,39.41l4.13-4.14Zm4,7.14h4.88v2H24Zm-10.13-12v18h20v-18Zm18,16h-16v-14h16Z'
        transform='translate(0.01)' fill='#fff' />
    </svg>
  );
};
