import React from 'react';

export const BookFileIcon = ({ className }: { className?: string }): React.ReactElement => {
  return (
    <svg viewBox='0 0 49.77 59.72' className={className}>
      <path
        d='M3,0A2.84,2.84,0,0,0,.89.9,3.14,3.14,0,0,0,0,3V56.74a2.86,2.86,0,0,0,.9,2.09A2.91,2.91,0,0,0,3,59.72h43.8a2.86,2.86,0,0,0,2.09-.89,3,3,0,0,0,.89-2.09V16.92L32.84,0Z'
        transform='translate(0.01)' fill='#e5d16b' />
      <path d='M49.76,16.92H35.83a3.06,3.06,0,0,1-3-3V0Z' transform='translate(0.01)' fill='#fff' opacity='0.5' />
      <path
        d='M30.56,22.39H16.87a2.28,2.28,0,0,0-2.28,2.28V42.92a2.28,2.28,0,0,0,2.28,2.28H30.56a2.28,2.28,0,0,0,2.28-2.28V24.67a2.28,2.28,0,0,0-2.28-2.28ZM16.87,24.67h5.7V33.8l-2.85-1.71L16.87,33.8Z'
        transform='translate(0.01)' fill='#fff' />
    </svg>
  );
};
