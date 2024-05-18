import { SITE_TITLE } from '@/consts';
import { getHref } from '@/lib/helper';
import { usePostDetail } from '@/store/postDetail';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

function ViewCount({ count }) {
  const motionValue = useMotionValue(0);
  const roundedCount = useTransform(motionValue, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(motionValue, count, { duration: 3 });
    return () => controls.stop();
  }, []);

  return <motion.span>{roundedCount}</motion.span>;
}

export function Visitors({ triggerOnload = true }) {
  const viewCount = usePostDetail((state) => state.viewCount);
  const loading = usePostDetail((state) => state.loading);
  const fetcher = usePostDetail((state) => state.fetch);

  useEffect(() => {
    fetcher(getPost());
  }, []);

  return loading ? <span className="inline-block m-0 text-xs animate-spin">⌛️</span> : <ViewCount count={viewCount} />;
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
  function removePreCode(htmlText: string) {
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
    .replace(/\s+/g, ' ')
    .trim();
}
