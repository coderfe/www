import { useLocalStorage, useMedia } from 'react-use';
import { useEffect, useMemo } from 'react';

export default function useColorTheme() {
  const systemPrefers = useMedia('(prefers-color-scheme: dark)');
  const [isDark, setIsDark] = useLocalStorage<boolean>('darkMode');

  const value = useMemo(() => (isDark === undefined ? systemPrefers : isDark), [isDark, systemPrefers]);

  useEffect(() => {
    if (value) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [value]);

  return {
    isDark: value,
    setIsDark,
  };
}
