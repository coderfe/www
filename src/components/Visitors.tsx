import { supabase } from '@/lib/supabase.js';
import { useEffect, useState } from 'react';

export function Visitors({ href, triggerOnload = true }) {
  const [visitors, setVisitors] = useState(0);
  const url = new URL(href).href.replace(/\/$/g, '');

  useEffect(() => {
    async function getVisitors() {
      let { data: visitor, error } = await supabase.from('visitor').select('*').eq('url', url);
      const [currentPage] = visitor ?? [];
      if (error) return setVisitors(0);
      setVisitors(currentPage?.count ?? 0);
    }

    async function setVisitor() {
      if (!url) return;
      const { data, error } = await supabase.from('visitor').select('*').eq('url', url);
      if (error) return console.log(error.code);
      if (data.length === 0) {
        await supabase.from('visitor').insert({ url, count: 1 });
      } else {
        const [item] = data;
        const { count } = item;
        await supabase
          .from('visitor')
          .update({ count: count! + 1 })
          .eq('url', url);
      }
      getVisitors();
    }

    triggerOnload && setVisitor();

    getVisitors();
  }, []);

  return <span>{visitors}</span>;
}
