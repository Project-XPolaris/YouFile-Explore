import React from 'react';

export const PhotoshopFileIcon = ({ className }: { className?: string }): React.ReactElement => {
  return (
    <svg viewBox='0 0 49.77 59.72' className={className}>

      <path
        d='M3,0A2.84,2.84,0,0,0,.89.9,3.14,3.14,0,0,0,0,3V56.74a2.86,2.86,0,0,0,.9,2.09A2.91,2.91,0,0,0,3,59.72h43.8a2.86,2.86,0,0,0,2.09-.89,3,3,0,0,0,.89-2.09V16.92L32.84,0Z'
        transform='translate(0.01)' fill='#031c32' />
      <path d='M49.76,16.92H35.83a3.06,3.06,0,0,1-3-3V0Z' transform='translate(0.01)' fill='#fff' opacity='0.5' />
      <path
        d='M22.86,32.24a2,2,0,0,1,.88-.22,2.08,2.08,0,0,1,.88.22l10.15,5.89a.86.86,0,0,1,0,1.5L24.53,45.56a2,2,0,0,1-.88.22,2,2,0,0,1-.88-.22L12.62,39.67a.85.85,0,0,1,0-1.49Z'
        transform='translate(0.01)' fill='#4098d4' />
      <path
        d='M22.86,23.45a2,2,0,0,1,.88-.22,2.08,2.08,0,0,1,.88.22l10.15,5.89a.86.86,0,0,1,.44.75.87.87,0,0,1-.44.75L24.53,36.77a2,2,0,0,1-.88.22,2,2,0,0,1-.88-.22L12.62,30.88a.85.85,0,0,1,0-1.49Z'
        transform='translate(0.01)' fill='#fff' />
    </svg>
  );
};
