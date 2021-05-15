import React from 'react';

export const FolderIcon = ({ className }: { className?: string }): React.ReactElement => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56.77 45.41' className={className}>
      <path d='M51.09,5.68H25.55L19.87,0H5.68A5.69,5.69,0,0,0,0,5.68V17H56.77V11.35a5.69,5.69,0,0,0-5.68-5.67Z'
            fill='#f49c19' />
      <path
        d='M51.09,5.68H5.68A5.69,5.69,0,0,0,0,11.35V39.74a5.69,5.69,0,0,0,5.68,5.67H51.09a5.69,5.69,0,0,0,5.68-5.67V11.35a5.69,5.69,0,0,0-5.68-5.67Z'
        fill='#f5c432' />
    </svg>
  );
};
