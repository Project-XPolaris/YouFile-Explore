import React from 'react';

export const MsiFileIcon = ({ className }: { className?: string }): React.ReactElement => {
  return (
    <svg viewBox='0 0 46.02 46.02' className={className}>

      <path
        d='M44.85,5.71l-3.56-4.3A3.73,3.73,0,0,0,38.35,0H7.67a3.82,3.82,0,0,0-3,1.41L1.18,5.71A4.94,4.94,0,0,0,0,9v32A5.13,5.13,0,0,0,5.12,46H40.91A5.13,5.13,0,0,0,46,40.91V9A5,5,0,0,0,44.85,5.71ZM5.31,5.31,7.08,1.77H38.94l1.77,3.54Z'
        transform='translate(0 0)' fill='#1577be' />
      <path
        d='M13.58,25h7.61V17.69l-7.61,1.1Zm8.65-7.44V25H32.45V16.05ZM13.58,32.19l7.61,1.11V26H13.58Zm8.65,1.26,10.22,1.48V26H22.23Z'
        transform='translate(0 0)' fill='#fff' />
    </svg>
  );
};
