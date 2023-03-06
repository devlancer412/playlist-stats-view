import React from 'react';
import { Motion, spring } from 'react-motion';

import './SimpleMarker.scss';

export const SimpleMarker = (props: any) => {
  const { color, name, count } = props;
  return (
    <div>
      <div
        className='pin bounce'
        style={{ backgroundColor: color, cursor: 'pointer' }}
        title={name}
      ></div>
      <div className='title'>{count}</div>
      <div className='pulse' />
    </div>
  );
};
