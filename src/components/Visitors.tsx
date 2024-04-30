import { updateVisitorsByUrl } from '@/api';
import { getHref } from '@/helper';
import { useEffect, useState } from 'react';

export function Visitors({ triggerOnload = true }) {
  const [visitors, setVisitors] = useState(0);

  useEffect(() => {
    updateVisitorsByUrl(getHref(), triggerOnload).then((res) => {
      const {
        data: { count },
        success,
      } = res;
      if (!success) return;
      setVisitors(count);
    });
  }, []);

  return <span>{visitors}</span>;
}
