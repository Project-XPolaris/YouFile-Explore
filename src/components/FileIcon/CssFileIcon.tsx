import React from 'react';

export const CSSFileIcon = ({ className }: { className?: string }): React.ReactElement => {
  return (
    <svg viewBox='0 0 49.77 59.72' className={className}>
      <path
        d='M3,0A2.84,2.84,0,0,0,.89.9,3.14,3.14,0,0,0,0,3V56.74a2.86,2.86,0,0,0,.9,2.09A2.91,2.91,0,0,0,3,59.72h43.8a2.86,2.86,0,0,0,2.09-.89,3,3,0,0,0,.89-2.09V16.92L32.84,0Z'
        transform='translate(0.01)' fill='#3b82c5' />
      <path d='M49.76,16.92H35.83a3.06,3.06,0,0,1-3-3V0Z' transform='translate(0.01)' fill='#fff' opacity='0.5' />
      <path
        d='M17,26.34l-.74,3.78H31.59l-.5,2.44H15.74L15,36.33H30.35l-.85,4.31-6.2,2-5.37-2,.37-1.86H14.53l-.9,4.52,8.88,3.4,10.23-3.4,1.36-6.81.27-1.37,1.74-8.78Z'
        transform='translate(0.01)' fill='#fff' />
    </svg>
  );
};
