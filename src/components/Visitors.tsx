import { updateVisitorsByUrl } from '@/api';
import { getHref } from '@/helper';
import { useEffect, useState } from 'react';

export function Visitors({ triggerOnload = true }) {
  const [visitors, setVisitors] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    updateVisitorsByUrl(getHref(), triggerOnload)
      .then((res) => {
        const {
          data: { count },
          success,
        } = res;
        if (!success) return;
        setVisitors(count);
      })
      .finally(() => setLoading(false));
  }, []);

  return loading ? <span className="inline-block animate-spin">⏳</span> : <span>{visitors}</span>;
}
