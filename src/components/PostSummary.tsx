import { fetchSummary } from '@/api';
import KimiLogo from '@/assets/kimi.png';
import { getHref } from '@/helper';
import { useEffect, useState } from 'react';

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
    <div className="bg-slate-100 rounded-lg p-4 mt-2 dark:bg-slate-800">
      <p className="flex items-center gap-2 m-0">
        <span className="size-5 bg-contain" style={{ backgroundImage: `url(${KimiLogo.src})` }}></span>
        <span className="text-black dark:text-white font-semibold">AI 生成的摘要</span>
      </p>
      {loading ? <p className="m-1 mb-0">🤖在努力了……</p> : <p className="m-1 italic mb-0">{summary}</p>}
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
