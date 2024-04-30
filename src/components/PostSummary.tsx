import KimiLogo from '@/assets/kimi.png';
import ky from 'ky';
import { useEffect, useState } from 'react';

export function PostSummary() {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetchSummary()
      .then((text) => {
        setSummary(text);
      })
      .finally(() => {
        setLoading(false);
      });
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

type Res = {
  success: boolean;
  data: string;
};

async function fetchSummary() {
  try {
    const url = window.location.href.replace('http://dev.', 'https://');
    const content = document.querySelector('article')?.textContent;
    const res = await ky
      .post('http://ai.coderfee.com/kimi/summary', {
        credentials: 'include',
        json: {
          url,
          content,
        },
      })
      .json<Res>();
    const { success, data } = res;
    return success ? data : '🤖奔溃了……';
  } catch (e) {
    return '🤖超时了……';
  }
}
