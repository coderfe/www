export const getHref = () => {
  return window.location.href.replace('http://dev.', 'https://').replace(/\/$/, '');
};

export function throttle(func: any, timeFrame: number) {
  let lastTime = 0;
  return function (...args: any) {
    const now = Date.now();
    if (now - lastTime >= timeFrame) {
      func(...args);
      lastTime = now;
    }
  };
}
