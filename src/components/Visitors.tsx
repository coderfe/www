import { pageView } from '@/api';
import { SITE_TITLE } from '@/consts';
import { getHref } from '@/helper';
import { useEffect, useState } from 'react';

export function Visitors({ triggerOnload = true }) {
  const [visitors, setVisitors] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const title = document.querySelector('h1')?.textContent ?? SITE_TITLE;
    pageView(getHref(), title)
      .then((res) => {
        const { data, success } = res;
        if (!success) return;
        setVisitors(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return loading ? <span className="inline-block animate-spin">⏳</span> : <span>{visitors}</span>;
}
