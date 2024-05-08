import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function ModeToggle() {
  const [theme, setThemeState] = useState<Theme>('light');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setThemeState(isDarkMode ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    const isDark =
      theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
  }, [theme]);

  function handleThemeChange(theme: Theme) {
    setThemeState(theme);
    setIsVisible(false);
  }

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center size-12 text-lg md:size-10 md:text-base outline-accent hover:opacity-100 focus:opacity-100 focus:outline-none rounded-xl border border-zinc-400/20 backdrop-blur-lg dark:border-zinc-500/30 dark:text-zinc-200 bg-zinc-50/80 shadow-lg dark:bg-zinc-950/80 transition-all duration-500 ease-in-out cursor-pointer"
        onClick={() => setIsVisible(!isVisible)}
      >
        <span className="icon-[tabler--color-filter]"></span>
      </button>
      <AnimatePresence>
        {isVisible && (
          <>
            <motion.button
              key="light"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="absolute -left-14 top-0 z-20 flex items-center justify-center size-12 text-lg md:size-10 md:text-base outline-accent hover:opacity-100 focus:opacity-100 focus:outline-none rounded-xl border border-zinc-400/20 backdrop-blur-lg dark:border-zinc-500/30 dark:text-zinc-200 bg-zinc-50/80 shadow-lg dark:bg-zinc-950/80 transition-all duration-500 ease-in-out cursor-pointer"
              onClick={() => handleThemeChange('light')}
            >
              <span className="icon-[tabler--sun-high]"></span>
            </motion.button>
            <motion.button
              key="dark"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 80 }}
              className="z-20 absolute -left-28 top-0 flex items-center justify-center size-12 text-lg md:size-10 md:text-base outline-accent hover:opacity-100 focus:opacity-100 focus:outline-none rounded-xl border border-zinc-400/20 backdrop-blur-lg dark:border-zinc-500/30 dark:text-zinc-200 bg-zinc-50/80 shadow-lg dark:bg-zinc-950/80 transition-all duration-500 ease-in-out cursor-pointer"
              onClick={() => handleThemeChange('dark')}
            >
              <span className="icon-[tabler--moon-stars]"></span>
            </motion.button>
            <motion.button
              key="system"
              initial={{ opacity: 0, y: 120 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 120 }}
              className="z-20 absolute -left-[168px] top-0 flex items-center justify-center size-12 text-lg md:size-10 md:text-base outline-accent hover:opacity-100 focus:opacity-100 focus:outline-none rounded-xl border border-zinc-400/20 backdrop-blur-lg dark:border-zinc-500/30 dark:text-zinc-200 bg-zinc-50/80 shadow-lg dark:bg-zinc-950/80 transition-all duration-500 ease-in-out cursor-pointer"
              onClick={() => handleThemeChange('system')}
            >
              <span className="icon-[tabler--brightness-auto]"></span>
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
