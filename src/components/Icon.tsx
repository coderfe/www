import React from 'react';
import { IconContext } from '@react-icons/all-files';

type Props = {
  iconOption: IconContext;
  children: JSX.Element;
};

const Icon: React.FC<Props> = function Icon(props: Props) {
  const { iconOption, children } = props;
  return <IconContext.Provider value={iconOption}>{children}</IconContext.Provider>;
};

export default Icon;
