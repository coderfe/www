import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase.js';

export function Visitors({ pathname }) {
  const [visitors, setVisitors] = useState(0);
  const sulgPathname = slugify(pathname);
  useEffect(() => {
    async function getVisitors() {
      let { data: visitor, error } = await supabase.from('visitor').select('*').eq('path', sulgPathname);
      const [currentPage] = visitor;
      if (!error) {
        setVisitors(currentPage.count);
      }
    }

    async function setVisitor() {
      if (!sulgPathname) return;
      const { data, error } = await supabase.from('visitor').select('*').eq('path', sulgPathname);
      if (!error) {
        if (data.length === 0) {
          await supabase.from('visitor').insert({ path: sulgPathname, count: 1 });
        } else {
          await supabase
            .from('visitor')
            .update({ count: data[0].count + 1 })
            .eq('path', sulgPathname);
        }
        getVisitors();
      }
    }

    setVisitor();

    getVisitors();
  }, []);

  return (
    <div className="text-center text-sm space-x-4">
      <span>👏欢迎，本页访问次数 {visitors}</span>
      <span>❤️</span>
      <span className="text-gray-500">Powered By Supabase</span>
    </div>
  );
}

function slugify(str) {
  if (!str || str === '/') return '-';
  return str.replace(/^\/|\/$/g, '').replace(/\//g, '-');
}
