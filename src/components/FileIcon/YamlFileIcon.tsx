import React from 'react';

export const YamlFileIcon = ({ className }: { className?: string }): React.ReactElement => {
  return (
    <svg viewBox='0 0 49.77 59.72' className={className}>

      <path
        d='M3,0A2.84,2.84,0,0,0,.89.9,3.14,3.14,0,0,0,0,3V56.74a2.86,2.86,0,0,0,.9,2.09A2.91,2.91,0,0,0,3,59.72h43.8a2.86,2.86,0,0,0,2.09-.89,3,3,0,0,0,.89-2.09V16.92L32.84,0Z'
        transform='translate(0.01)' fill='#b62222' />
      <path d='M49.76,16.92H35.83a3.06,3.06,0,0,1-3-3V0Z' transform='translate(0.01)' fill='#fff' opacity='0.5' />
      <polygon points='37.59 44.55 31.82 44.55 31.82 35.98 29.43 35.98 29.43 46.87 37.59 46.87 37.59 44.55 37.59 44.55'
               fill='#040000' />
      <polygon
        points='16.54 35.99 16.54 46.92 18.89 46.92 18.89 39.38 21.34 44.45 23.19 44.45 25.73 39.2 25.73 46.92 27.98 46.92 27.98 35.99 24.91 35.99 22.18 40.93 19.58 35.99 16.54 35.99 16.54 35.99'
        fill='#040000' />
      <path d='M28.57,32.28H23.51l-1,2.48H20.25L25,23.6h2.29l4.54,11.16H29.42l-.85-2.48Zm-.84-2.23L26.18,26l-1.73,4.09Z'
            transform='translate(0.01)' fill='#fff' />
      <polygon
        points='23.89 23.57 19.33 30.41 19.33 34.73 16.54 34.73 16.54 30.41 12.19 23.57 15.33 23.57 18.09 27.97 20.88 23.57 23.89 23.57 23.89 23.57'
        fill='#040000' />
    </svg>
  );
};
