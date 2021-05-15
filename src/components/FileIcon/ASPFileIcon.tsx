import React from 'react';

export const ASPFileIcon = ({ className }: { className?: string }): React.ReactElement => {
  return (
    <svg viewBox='0 0 49.77 59.72' className={className}>
      <path
        d='M3,0A2.84,2.84,0,0,0,.89.9,3.14,3.14,0,0,0,0,3V56.74a2.86,2.86,0,0,0,.9,2.09A2.91,2.91,0,0,0,3,59.72h43.8a2.86,2.86,0,0,0,2.09-.89,3,3,0,0,0,.89-2.09V16.92L32.84,0Z'
        transform='translate(0.01)' fill='#ebbe39' />
      <path d='M49.76,16.92H35.83a3.06,3.06,0,0,1-3-3V0Z' transform='translate(0.01)' fill='#fff' opacity='0.5' />
      <path d='M20.27,24.17l-9.52,9.52,9.52,9.52,3.62-3.58L18,33.69l5.93-5.93Z' transform='translate(0.01)'
            fill='#fff' />
      <path d='M37,23.23l2,.92-10.38,20-2-.92Z' transform='translate(0.01)' fill='#fff' />
    </svg>
  );
};
