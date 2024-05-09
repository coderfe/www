import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';

export function Search() {
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [keyword, setKeyword] = useState<string>('');

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    async function loadPagefind() {
      if (typeof window.pagefind === 'undefined') {
        try {
          // @ts-ignore import after building
          window.pagefind = await import(/*@vite-ignore */ `/pagefind/pagefind.js?${Date.now()}`);
          await window.pagefind.init();
        } catch (e) {
          window.pagefind = { search: () => ({ results: [] }) };
        }
      }
    }
    loadPagefind();
  }, []);

  const handleSearch = async () => {
    const { results } = await window.pagefind.search(keyword);
    const data = await Promise.all(results.map((item: any) => item.data()));
    setResults(data);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-3/4">
        <SheetHeader>
          <SheetTitle>搜一搜</SheetTitle>
          <SheetDescription>坐和放宽，搜一搜</SheetDescription>
          <div>
            <div className="flex gap-4">
              <Input placeholder="" onInput={(e) => setKeyword((e.target as HTMLInputElement).value)} />
              <Button size="sm" onClick={handleSearch}>
                <span className="icon-[tabler--search]"></span>
              </Button>
            </div>
            {results.length > 0 &&
              results.map((item) => {
                return (
                  <a key={item.url}>
                    <h2>{item.meta.title}</h2>
                    <p dangerouslySetInnerHTML={{ __html: item.excerpt }}></p>
                  </a>
                );
              })}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

declare global {
  interface Window {
    pagefind: any;
  }
}
