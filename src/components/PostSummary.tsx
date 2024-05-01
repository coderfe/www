import { fetchSummary } from '@/api';
import KimiLogo from '@/assets/kimi.png';
import { getHref } from '@/helper';
import { useEffect, useState } from 'react';

function Skeleton() {
  return <div className=" bg-slate-200 dark:bg-slate-800 h-4 rounded animate-pulse" />;
}

export function PostSummary() {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getSummary()
      .then((text) => setSummary(text))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="border rounded-xl space-y-1 dark:border-slate-800 p-4 mt-4" aria-label="文章摘要">
      <p className="flex items-center gap-2 m-0">
        <span className="size-5 bg-contain" style={{ backgroundImage: `url(${KimiLogo.src})` }}></span>
        <span className="text-black dark:text-white font-semibold">AI 生成的摘要</span>
      </p>
      <div className="space-y-2 transition-[height] duration-300 ease-in-out">
        {loading ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          <div className="m-0">{summary}</div>
        )}
      </div>
    </div>
  );
}

async function getSummary() {
  try {
    const url = getHref();
    const content = document.querySelector('article')?.textContent;
    const { success, data } = await fetchSummary(url, content!);
    return success ? data : '🤖奔溃了……';
  } catch (e) {
    console.log(e);
    return '🤖超时了……';
  }
}
