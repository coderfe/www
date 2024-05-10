import type { MarkdownHeading } from 'astro';

export const getHref = () => {
  if (typeof window === 'undefined') return '';
  return window.location.href.replace('http://dev.', 'https://').replace(/\/$/, '');
};

export function throttle(func: Function, timeFrame: number) {
  let lastTime = 0;
  return function (...args: any) {
    const now = Date.now();
    if (now - lastTime >= timeFrame) {
      func(...args);
      lastTime = now;
    }
  };
}

export function debounce(func: Function, wait: number, immediate: boolean) {
  let timeout: NodeJS.Timeout;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timeout);
    if (immediate && !timeout) func.apply(context, args);
    timeout = setTimeout(function () {
      clearTimeout(timeout);
      if (!immediate) func.apply(context, args);
    }, wait);
  };
}

export function copyTextToClipboard(text: string): Promise<void> {
  return new Promise((resolve) => {
    if (!navigator.clipboard) {
      resolve(fallbackCopyTextToClipboard(text));
    }
    resolve(navigator.clipboard.writeText(text));
  });
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;

  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('unable to copy', err);
  }

  document.body.removeChild(textArea);
}
