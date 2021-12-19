import React from 'react';
import { IconContext } from '@react-icons/all-files';

type Props = {
  iconOption: IconContext;
}

const Icon: React.FC<Props> = function Icon({ children, iconOption }) {
  return (
    <IconContext.Provider
      value={iconOption}
    >
      { children }
    </IconContext.Provider>
  );
};

export default Icon;
