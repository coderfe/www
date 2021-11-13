import * as React from 'react';

const Container = function Container({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`container ${className}`}>{children}</div>;
};

Container.defaultProps = {
  className: '',
};

export default Container;
