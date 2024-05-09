import { CommandDialog, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { useEffect, useState } from 'react';

export function Search() {
  const [open, setOpen] = useState(false);

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
  return (
    <>
      <span className="icon-[tabler--search]"></span>
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span className="text-xs">⌘</span>J
      </kbd>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="搜一搜..." />
        <CommandList>
          <CommandGroup heading="网站设置">
            <CommandItem>点个赞</CommandItem>
            <CommandItem>暗黑模式</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
