import React from 'react';
import PropType from 'prop-types';

import './divider.css';

export default function Divider({ type, width }) {
  const classnames = ['divider'];

  classnames.push(type === 'vertical' ? 'v-divider' : 'h-divider');

  return <div style={{ width }} className={classnames.join(' ')} />;
}

Divider.defaultProps = {
  type: 'horizontal',
  width: '100%',
};

Divider.propType = {
  type: PropType.string,
  width: PropType.oneOfType([PropType.number, PropType.string]),
};
