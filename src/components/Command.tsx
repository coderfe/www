import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

export function Command() {
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<PagefindResult[]>([]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    async function loadPagefind() {
      try {
        // @ts-ignore import after building
        window.pagefind = await import(/*@vite-ignore */ `/pagefind/pagefind.js?${Date.now()}`);
        await window.pagefind.init();
      } catch (e) {
        window.pagefind = { search: () => ({ results: [] }) };
      }
    }
    loadPagefind();
  }, []);

  useEffect(() => {
    if (!open) setResults([]);
  }, [open]);

  const handleSearch = async (keyword: string) => {
    const { results } = await window.pagefind.search(keyword);
    const data = await Promise.all(results.map((item: any) => item.data()));
    setResults(data);
  };

  const handleCommandClick = (item: PagefindResult) => {
    window.open(item.url, '_blank');
  };

  return (
    <>
      <Button className="h-8" variant="ghost" onClick={() => setOpen(true)}>
        <span className="icon-[tabler--search] text-lg"></span>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch(e.currentTarget.value);
            }
          }}
          placeholder="搜一搜..."
        />
        <CommandList>
          {results.length === 0 ? (
            <CommandEmpty>404</CommandEmpty>
          ) : (
            <CommandGroup>
              {results.map((item) => {
                return (
                  <CommandItem key={item.url} value={item.url}>
                    <div onClick={() => handleCommandClick(item)}>
                      <p className="font-medium">{item.meta.title}</p>
                      <p
                        className="line-clamp-1 [&>mark]:text-black [&>mark]:bg-transparent [&>mark]:font-semibold"
                        dangerouslySetInnerHTML={{ __html: item.excerpt }}
                      />
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}

// fix pagefind type
declare global {
  interface Window {
    pagefind: any;
  }
}
