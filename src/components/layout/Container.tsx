import * as React from 'react'

export default function Container({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`container ${className}`}>{children}</div>
}
