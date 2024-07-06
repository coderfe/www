import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { socials } from '@/consts';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Social from './Social';

export function Hello({ children }: { children?: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const hello = "Hi👋, I'm coderfee.".split('');
  const txt = 'A FrontEnd <Developer />.'.split('');

  useEffect(() => {
    setIsVisible(true);
  });

  return (
    <TooltipProvider>
      <div className="grid grid-rows-2 text-xl md:grid-cols-2 md:grid-rows-none md:justify-center md:items-center lg:text-4xl font-mono w-screen h-screen font-light">
        <div className="h-full flex justify-center items-center">
          <h1>
            {isVisible && (
              <>
                <motion.div className="mb-2" transition={{ duration: 1, delay: 0.5 }}>
                  {hello.map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.div className="mb-8" transition={{ duration: 1, delay: 1.5 }}>
                  {txt.map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 2 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div className="flex gap-4 items-center text-xl text-black">
                  {socials.map(({ name, url, icon, color }, index) => (
                    <motion.a
                      key={name}
                      href={url}
                      target={url === '/blog' ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 5 }}
                      className="inline-block"
                      aria-label={`link to ${name}`}
                    >
                      <Tooltip>
                        <TooltipTrigger>
                          <Social social={{ name, url, icon, color }} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </motion.a>
                  ))}
                </motion.div>
              </>
            )}
          </h1>
        </div>
        <div className="h-full flex justify-center items-center">
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1 }}
              aria-label="site owner avatar"
              className="size-52 bg-contain rounded-full ring-1 ring-zinc-300/20 shadow-md"
              style={{ backgroundImage: `url(https://assets.coderfee.com/blog/avatar.jpg)` }}
            ></motion.div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
