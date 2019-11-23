export function cacheImages(url) {
  const weserv = 'https://images.weserv.nl';
  if (url) {
    return `${weserv}?url=${url.replace('https://', '')}`;
  }
}
/* 
export function enableTheme(newTheme) {
  const root = document.documentElement;
  const oldTheme = newTheme === 'light' ? 'dark' : 'light';

  root.classList.add(newTheme);
  root.classList.remove(oldTheme);

  localStorage.setItem('prefers-theme', newTheme);
}

export function localTheme() {
  return localStorage.getItem('prefers-theme');
}

export function systemTheme() {
  let perf = window.matchMedia('prefers-color-schema: dark');
  if (perf.matches) {
    return 'dark';
  } else {
    perf = window.matchMedia('prefers-color-schema: light');
    if (perf.matches) {
      return 'light';
    }
  }
  return null;
}

export const initTheme = localTheme() || systemTheme();
 */
