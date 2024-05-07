import { SITE_TITLE } from '@/consts';
import { getHref } from '@/helper';
import { usePostDetail } from '@/store';
import { useEffect } from 'react';

export function Visitors({ triggerOnload = true }) {
  const viewCount = usePostDetail((state) => state.viewCount);
  const loading = usePostDetail((state) => state.loading);
  const fetcher = usePostDetail((state) => state.fetch);

  useEffect(() => {
    fetcher(getPost());
  }, []);

  return loading ? <span className="inline-block m-0 text-xs animate-spin">⌛️</span> : <span>{viewCount}</span>;
}

function getPost() {
  const url = getHref();
  const content = document.querySelector('#content')?.innerHTML;
  const title = document.querySelector('h1')?.textContent ?? SITE_TITLE;
  return {
    url,
    title,
    content: content ? cleanHtml(content) : null,
  };
}

function cleanHtml(html: string) {
  function removePreCode(htmlText) {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlText;
    var preElements = tempDiv.getElementsByTagName('pre');
    for (var i = 0; i < preElements.length; i++) {
      preElements[i].textContent = '';
    }
    return tempDiv.innerHTML;
  }
  return removePreCode(html)
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ');
}
