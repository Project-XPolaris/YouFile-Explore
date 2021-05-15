import React from 'react';

export const ImageFileIcon = ({ className }: { className?: string }): React.ReactElement => {
  return (
    <svg viewBox='0 0 49.77 59.72' className={className}>
      <path
        d='M3,0A2.84,2.84,0,0,0,.89.9,3.14,3.14,0,0,0,0,3V56.74a2.86,2.86,0,0,0,.9,2.09A2.91,2.91,0,0,0,3,59.72h43.8a2.86,2.86,0,0,0,2.09-.89,3,3,0,0,0,.89-2.09V16.92L32.84,0Z'
        transform='translate(0.01)' fill='#83cde0' />
      <path d='M49.76,16.92H35.83a3.06,3.06,0,0,1-3-3V0Z' transform='translate(0.01)' fill='#fff' opacity='0.5' />
      <path d='M31.79,25.43a2.35,2.35,0,1,0,2.34-2.35,2.35,2.35,0,0,0-2.34,2.35Z' transform='translate(0.01)'
            fill='#fff' />
      <path
        d='M39.77,42.67,33.9,33.56a.91.91,0,0,0-.8-.43,1,1,0,0,0-.8.43l-3.15,4.88L22.11,27a.91.91,0,0,0-.8-.43,1,1,0,0,0-.8.43L10.83,42.67a.85.85,0,0,0,0,.94.87.87,0,0,0,.8.47H39a1.06,1.06,0,0,0,.85-.47.94.94,0,0,0,0-.94Z'
        transform='translate(0.01)' fill='#fff' />
    </svg>
  );
};
