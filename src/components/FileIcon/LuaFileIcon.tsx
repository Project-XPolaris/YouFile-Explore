import React from 'react';

export const LuaFileIcon = ({ className }: { className?: string }): React.ReactElement => {
  return (
    <svg viewBox='0 0 49.77 59.72' className={className}>

      <path
        d='M3,0A2.84,2.84,0,0,0,.89.9,3.14,3.14,0,0,0,0,3V56.74a2.86,2.86,0,0,0,.9,2.09A2.91,2.91,0,0,0,3,59.72h43.8a2.86,2.86,0,0,0,2.09-.89,3,3,0,0,0,.89-2.09V16.92L32.84,0Z'
        transform='translate(0.01)' fill='#1e2b59' />
      <path d='M49.76,16.92H35.83a3.06,3.06,0,0,1-3-3V0Z' transform='translate(0.01)' fill='#fff' opacity='0.5' />
      <path
        d='M22.4,28.17A10.07,10.07,0,1,0,32.63,38.24,10.15,10.15,0,0,0,22.4,28.17Zm2.93,3a3.72,3.72,0,0,1,2.61,1.06,3.68,3.68,0,1,1-5.21,0,3.71,3.71,0,0,1,2.6-1.06Z'
        transform='translate(0.01)' fill='#fff' />
      <path d='M30.25,26.38a3.68,3.68,0,1,0,3.67-3.61,3.64,3.64,0,0,0-3.67,3.61Z' transform='translate(0.01)'
            fill='#fff' />
    </svg>
  );
};
